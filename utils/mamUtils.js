const deepCopy = require('./deepCopy');
const combineSortedArray = require('./combineSortedArray');

const Mam = require('./mam.node.js');
const IOTA = require('iota.lib.js');

const iota = new IOTA({ provider: 'http://node.deviceproof.org:14265' });
const Cert = require('./cert.js');
const tools = require('./tools.js');
const now = require('moment');

const debug = process.env.DEBUG || 0;

const localStore = require('./localStore.js');


const AccountStore = localStore.Account;
const ContactStore = localStore.Contact;
const MessageStore = localStore.Message;

const path = require('path');

const mainPath = path.dirname(require.main.filename);

class mam {
  /* make the callback function into promise */
  constructor(callback) {
    const self = this;

    const databaseInitialize = () => {
      Mam.init(iota);
      self.accountStore = new AccountStore(path.resolve(mainPath, 'json', 'account.json'), () => {
        self.contactStore = new ContactStore(path.resolve(mainPath, 'json', 'contact.json'), () => {
          self.messageStore = new MessageStore(path.resolve(mainPath, 'json', 'message.json'), () => {
            callback();
          });
        });
      });
    };
    databaseInitialize();
  }

  async publishMessage(message, params) {
    const packet = { msg: message };

    /* add timestamp */
    packet.timestamp = now.utc().unix();

    const mamState = await this.getActiveMamState(params);
    await this.sendMamMsg(packet, params, mamState);

    const bkState = await this.getBackupMamState(params);
    await this.backupMamMsg(packet, params, bkState);

    this.messageUpdate(packet, params);
  }

  async getBackupMamState(params) {
    const store = this.contactStore.findOnly({ id: params.sender });

    return deepCopy(store.contacts[params.receiver].backupMamState);
  }


  async recoverMamMsg(params) {
    console.log('message recovering');

    const backupRoot = this.getBackupRoot(params);
    const messages = [];

    await Mam.fetch(backupRoot, 'private', null, (trytes) => {
      const data = JSON.parse(iota.utils.fromTrytes(trytes));
      data.fromSelf = true;
      messages.push(data); /* data wrapped message and other things */
    });

    const store = this.messageStore.findOnly({ id: params.sender });
    store.messages[params.receiver] = [].concat(messages);

    this.messageStore.update(store);
  }

  getBackupRoot(params) {
    const store = this.contactStore.findOnly({ id: params.sender });

    return store.contacts[params.receiver].backupRoot;
  }


  async fetchMessages(uuid) {
    const recvPriv = this.accountStore.findOnly({ id: uuid }).sk;
    const roots = await Cert.getBundles(uuid, 'M').then(data => data.map((item) => { // eslint-disable-line
      try {
        const msg = JSON.parse(tools.decryptUTF(item.message, recvPriv));
        /* TODO: signature verification */
        //        if(tools.verify(msg.root, msg.signature, send_id))
        return {
          id: msg.id,
          root: msg.root,
        };
      } catch (err) {
        console.log(err);
      }
    }));
    console.log('Fetched roots:', roots);
    const messages = {};
    // const { contacts } = this.contactStore.findOnly({ id: uuid });

    /* TODO: filter messages in contact */
    // var contactRoots = roots.filter(msg => msg.id in contacts)
    const contactRoots = roots;

    /* fetch from local */
    const localmsg = this.messageStore.findOnly({ id: uuid }).messages;
    // console.log('local:', localmsg)

    await Promise.all(contactRoots.map(async (tx) => {
      const { id } = tx;
      // const root = tx.root;
      messages[id] = [];

      /* fetch from tangle */
      await Mam.fetch(root, 'private', null, (tryte) => {
        const data = JSON.parse(iota.utils.fromTrytes(tryte));
        data.fromSelf = false;
        messages[id].push(data); /* data wrapped message and other things */
      });
    }));

    Object.keys(localmsg).map((id) => { // eslint-disable-line
      if (id in messages) {
        /* sort by timestamp */
        messages[id] = combineSortedArray(
          messages[id], localmsg[id],
          (i, j) => i.timestamp >= j.timestamp,
        );
      } else {
        messages[id] = [].concat(localmsg[id]);
      }
    });

    return messages;
  }


  async backupMamMsg(packet, params, bkState) {
    console.log('backupMamMsg');

    let sendPub = await Cert.getBundles(params.receiver, 'I');
    if (sendPub.length !== 1) { console.log('error: Get initial claim failed'); }
    sendPub = sendPub[0].message.pk;

    const msg = JSON.stringify(packet);
    const trytes = iota.utils.toTrytes(msg);
    const message = Mam.create(bkState, trytes);

    this.updateBackupMamState(params, message.state);

    if (debug) {
      console.log('Root: ', message.root);
      console.log('Address: ', message.address);
      console.log('length: ', message.payload.length);
    }

    await Mam.attach(message.payload, message.address);
    console.log('backupMamMsg finished');
  }

  async sendMamMsg(packet, params, mamState) {
    console.log('sendMamMsg');

    let recvPub = await Cert.getBundles(params.receiver, 'I');
    if (recvPub.length !== 1) { console.log('error: Get initial claim failed'); }
    recvPub = recvPub[0].message.pk;

    // const sendPriv = this.accountStore.findOnly({ id: params.sender }).sk;

    /* does private mode encrypt messages? */
    //  var msg = tools.encrypt(JSON.stringify(packet), recvPub)


    const msg = JSON.stringify(packet);
    const trytes = iota.utils.toTrytes(msg);
    const message = Mam.create(mamState, trytes);

    this.updateActiveMamState(params, message.state);

    if (debug) {
      console.log('Root: ', message.root);
      console.log('Address: ', message.address);
      console.log('length: ', message.payload.length);
    }

    await Mam.attach(message.payload, message.address);
    console.log('sendMamMsg finished');
  }

  addContact(userID, newContactorID) {
    const store = this.contactStore.findOnly({ id: userID });
    if (newContactorID in store.contacts) {
      console.log('[ERROR] error adding exist contact');
      return;
    }
    store.contacts[newContactorID] = {};
    this.contactStore.update(store);
  }

  async initMamClaim(params) {
    console.log('initMamClaim');
    // console.log(params)
    const bundles = await Cert.getBundles(params.receiver, 'I');
    const receiverPublicKey = bundles[0].message.pk;
    // console.log('recvPub:', receiverPublicKey)

    // const sender_priv = this.accountStore.findOnly({ id: params.sender }).sk;
    // console.log('sendPriv:', sender_priv)

    const state = this.getInitMamState(params);
    const root = Mam.getRoot(state);
    // console.log(root)
    const packet = {
      id: params.sender,
      root,
      /* TODO: Signature is too large */
      //    signature: tools.sign(root, sender_priv)
    };

    if (debug) {
      console.log('id: ', params.sender);
      console.log('root: ', root);
      console.log(`len:${JSON.stringify(packet).length}`);
    }

    const enc = tools.encrypt(JSON.stringify(packet), receiverPublicKey);
    await Cert.attach(enc, params.receiver, 'M', null);
  }


  getInitMamState(params) {
    console.log('getInitMamState');

    const store = this.contactStore.findOnly({ id: params.sender });

    /* init mam state */
    let mamState = Mam.init(iota);
    mamState = Mam.changeMode(mamState, 'private');
    /* in order to update next_root */
    Mam.create(mamState, 'INITIALMESSAGE');
    const newState = deepCopy(mamState);

    store.contacts[params.receiver] = {
      activeMamState: deepCopy(mamState),
    };


    /* init message backup mam state */
    let bkState = Mam.init(iota);
    bkState = Mam.changeMode(bkState, 'private');
    Mam.create(bkState, 'INITIALMESSAGE');

    store.contacts[params.receiver].backupMamState = deepCopy(bkState);
    store.contacts[params.receiver].backupRoot = bkState.next_root;


    if (debug) { console.log('Store updated: ', store); }

    this.contactStore.update(store);

    return newState;
  }

  async getActiveMamState(params) {
    console.log('getActiveMamState');

    let store = this.contactStore.findOnly({ id: params.sender });
    // console.log(store)
    let receiver = store.contacts[params.receiver];

    if (!(params.receiver in store.contacts)) {
      await this.initMamClaim(params);
      store = this.contactStore.findOnly({ id: params.sender });
      receiver = store.contacts[params.receiver];
    }

    return deepCopy(receiver.activeMamState);
  }

  updateActiveMamState(params, mamState) {
    const store = this.contactStore.findOnly({ id: params.sender });
    store.contacts[params.receiver].activeMamState = deepCopy(mamState);

    this.contactStore.update(store);
  }

  updateBackupMamState(params, bkState) {
    const store = this.contactStore.findOnly({ id: params.sender });
    store.contacts[params.receiver].backupMamState = deepCopy(bkState);

    this.contactStore.update(store);
  }

  /* temporary workaround */
  async createIdentity(packet) { // eslint-disable-line class-methods-use-this
    packet = deepCopy(packet); // eslint-disable-line no-param-reassign
    delete packet.sk;
    await Cert.attach(packet, packet.uuid, 'I');
  }

  accountUpdate(account) {
    this.accountStore.insert(account);
    this.contactStore.insert({
      id: account.id,
      contacts: {},
    });
    this.messageStore.insert({
      id: account.id,
      messages: {},
    });
  }

  messageUpdate(packet, params) {
    const store = this.messageStore.findOnly({ id: params.sender });
    packet.fromSelf = true;

    if (!(params.receiver in store.messages)) {
      store.messages[params.receiver] = [];
    }
    store.messages[params.receiver].push(packet);

    this.messageStore.update(store);
  }
}

module.exports = mam;
