var Mam = require('./mam.node.js')
var IOTA = require('iota.lib.js')
var iota = new IOTA({ provider: 'http://node.deviceproof.org:14265' })
var Cert = require('./cert.js')
var tools = require('./tools.js')
var now = require('moment')
const debug = process.env.DEBUG || 0

var AccountStore = require('./account.js')
var ContactStore = require('./contact.js')
var MessageStore = require('./message.js')

var path = require('path')
var main_path = path.dirname(require.main.filename)

class mam {
  /* make the callback function into promise */
  constructor(callback) {
    var self = this

    var databaseInitialize = function() {
      Mam.init(iota)
      self.accountStore = new AccountStore(path.resolve(main_path, 'json', 'account.json'), () => {
        self.contactStore = new ContactStore(path.resolve(main_path, 'json', 'contact.json'), () => {
          self.messageStore = new MessageStore(path.resolve(main_path, 'json', 'message.json'), () => {
            callback()
          })
        })
      })
    }
    databaseInitialize()
  }

  async publishMessage(message, params) {

    var packet = { msg: message }

    /* add timestamp */
    packet.timestamp = now.utc().unix()

    var mamState = await this.getActiveMamState(params)
    await this.sendMamMsg(packet, params, mamState)
    this.messageUpdate(packet, params)
  }

  async fetchMessages(uuid) {

    const recvPriv = this.accountStore.findOnly({id: uuid}).sk
    const roots = await Cert.getBundles(uuid, 'M').then(data => {
      return data.map(item => {
        try {
          var msg = JSON.parse(tools.decryptUTF(item.message, recvPriv))
          /* TODO: signature verification */
          //        if(tools.verify(msg.root, msg.signature, send_id))
          return {
            id: msg.id,
            root: msg.root
          }
        } catch(err) {
          console.log(err)
        }
      })
    })
    console.log('Fetched roots:', roots)
    var messages = {}
    var contacts = this.contactStore.findOnly({id: uuid}).contacts

    /* TODO: filter messages in contact */
    //var contactRoots = roots.filter(msg => msg.id in contacts)
    var contactRoots = roots

    /* fetch from local */
    var localmsg = this.messageStore.findOnly({id: uuid}).messages
    //console.log('local:', localmsg)

    await Promise.all(contactRoots.map(async tx => {
      var id = tx.id
      var root = tx.root
      messages[id] = []

      /* fetch from tangle */
      await Mam.fetch(root, 'private', null, tryte => {
        var data = JSON.parse(iota.utils.fromTrytes(tryte))
        data.fromSelf = false
        messages[id].push(data) /* data wrapped message and other things */
      })

    }))

    Object.keys(localmsg).map(id => {

      if (id in messages) {
        /* sort by timestamp */
        messages[id] = combineSortedArray(
          messages[id], localmsg[id], (i, j) => {
            return i.timestamp >= j.timestamp
          }
        )
      }
      else {
        messages[id] = [].concat(localmsg[id])
      }
    })

    return messages
  }



  async sendMamMsg(packet, params, mamState) {
    console.log('sendMamMsg')

    var recvPub = await Cert.getBundles(params.receiver, 'I')
    if(recvPub.length !== 1)
      console.log('error: Get Initial Claim failed')
    recvPub = recvPub[0].message.pk

    var sendPriv = this.accountStore.findOnly({id: params.sender}).sk

    //  packet.signature = tools.signHash(packet.msg, sendPriv)
    //  var msg = tools.encrypt(JSON.stringify(packet), recvPub)


    var msg = JSON.stringify(packet)
    var trytes = iota.utils.toTrytes(msg)
    var message = Mam.create(mamState, trytes)

    this.updateActiveMamState(params, message.state)

    if(debug) {
      console.log('Root: ', message.root)
      console.log('Address: ', message.address)
      console.log('length: ', message.payload.length)
    }

    var tx = await Mam.attach(message.payload, message.address)
    console.log('sendMamMsg finished')
  }

  addContact(self_id, add_id) {
    var store = this.contactStore.findOnly({id: self_id})
    if (add_id in store.contacts) {
      console.log('[ERROR] error adding exist contact')
      return
    }
    store.contacts[add_id] = {}
    this.contactStore.update(store)
  }

  async initMamClaim(params) {
    console.log('initMamClaim')
    //console.log(params)
    var receiver_pub = await Cert.getBundles(params.receiver, 'I')
    receiver_pub = receiver_pub[0].message.pk
    //console.log('recvPub:', receiver_pub)

    var sender_priv = this.accountStore.findOnly({id: params.sender}).sk
    //console.log('sendPriv:', sender_priv)

    const state = this.getInitMamState(params)
    const root = Mam.getRoot(state)
    //console.log(root)
    var packet = {
      id: params.sender,
      root: root,
      /* TODO: Signature is too large */
      //    signature: tools.sign(root, sender_priv)
    }

    if(debug) {
      console.log('id: ', params.sender)
      console.log('root: ', root)
      console.log('len:' + JSON.stringify(packet).length)
    }

    var enc = tools.encrypt(JSON.stringify(packet), receiver_pub)
    var tx = await Cert.attach(enc, params.receiver, 'M', null)
  }


  getInitMamState(params) {
    console.log('getInitMamState')

    var mamState = Mam.init(iota)
    mamState = Mam.changeMode(mamState, 'private')
    var msg = Mam.create(mamState, 'INITIALMESSAGE')
    var newState = deepCopy(msg.state)
    var store = this.contactStore.findOnly({id: params.sender})

    store.contacts[params.receiver] = {activeMamState: deepCopy(mamState)}

    if(debug)
      console.log('Store updated: ', store)

    this.contactStore.update(store)

    return newState
  }

  async getActiveMamState(params) {
    console.log('getActiveMamState')

    var store = this.contactStore.findOnly({id: params.sender})
    //console.log(store)
    var receiver = store.contacts[params.receiver]

    if(!(params.receiver in store.contacts)) {
      await this.initMamClaim(params)
      store = this.contactStore.findOnly({id: params.sender})
      receiver = store.contacts[params.receiver]
    }

    return deepCopy(receiver.activeMamState)
  }

  updateActiveMamState(params, mamState) {
    var store = this.contactStore.findOnly({id: params.sender})
    store.contacts[params.receiver].activeMamState = deepCopy(mamState)

    this.contactStore.update(store)
  }

  /* temporary workaround */
  async createIdentity(packet) {
    packet = deepCopy(packet)
    delete packet.sk
    await Cert.attach(packet, packet.uuid, 'I')
  }

  accountUpdate(account) {
    this.accountStore.insert(account)
    this.contactStore.insert({
      id: account.id,
      contacts: {}
    })
    this.messageStore.insert({
      id: account.id,
      messages: {}
    })
  }

  messageUpdate(packet, params) {
    var store = this.messageStore.findOnly({id: params.sender})
    packet.fromSelf = true

    store.messages[params.receiver] = []
    store.messages[params.receiver].push(packet)

    this.messageStore.update(store)
  }

}
function deepCopy(data) {
  return JSON.parse(JSON.stringify(data))
}

function combineSortedArray(arr1, arr2, cmp) {
  var target = deepCopy(arr1)
  var idx = 0

  for (var i = 0; i < arr2.length; idx++) {

    if (idx === target.length) {
      target = target.concat(arr2.slice(i))
      break
    }
    if (cmp(target[idx], arr2[i])) {
      target.splice(idx, 0, arr2[i])
      i++
    }
  }
  return target
}


module.exports = mam
