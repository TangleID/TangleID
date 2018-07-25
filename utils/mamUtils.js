const Mam = require('./mam.node.js');
const iota = require('./iotaSetup.js');
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

function deepCopy(data) {
  return JSON.parse(JSON.stringify(data));
}

function combineSortedArray(arr1, arr2, cmp) {
  let target = deepCopy(arr1);
  let idx = 0;

  for (let i = 0; i < arr2.length; idx++) {
    if (idx === target.length) {
      target = target.concat(arr2.slice(i));
      break;
    }
    if (cmp(target[idx], arr2[i])) {
      target.splice(idx, 0, arr2[i]);
      i++;
    }
  }
  return target;
}

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

    this.messageUpdate(packet, params);
  }

  async recoverMamMsg(params) {
    console.log('message recovering');

    const { initRoot, sideKey } = this.getRecoveryProps(params);
    const messages = [];

    await Mam.fetch(initRoot, 'restricted', sideKey, (trytes) => {
      const data = JSON.parse(iota.utils.fromTrytes(trytes));
      data.fromSelf = true;
      messages.push(data); /* data wrapped message and other things */
    });

    const store = this.messageStore.findOnly({ id: params.sender });
    store.messages[params.receiver] = [].concat(messages);

    this.messageStore.update(store);
  }

  getRecoveryProps(params) {
    /* make it restart from first root */
    const store = this.contactStore.findOnly({ id: params.sender });
    const receiver = store.contacts[params.receiver];
    const mamState = deepCopy(receiver.activateMamState);
    mamState.channel.start = 0;
    Mam.create(mamState, 'INITIALMESSAGE');

    return {
      initRoot: mamState.channel.next_root,
      sideKey: mamState.channel.side_key,
    };
  }


  async fetchMessages(uuid) {
    const recvPriv = this.accountStore.findOnly({ id: uuid }).sk;
    const roots = await Cert.getBundles(uuid, 'M')
      .then(async data =>
        await Promise.all(data.map(async (item) => {
          try {
            const message = JSON.parse(item.message);
            const msg = JSON.parse(tools.decryptUTF(message.msg, recvPriv));
            const bundles = await Cert.getBundles(msg.id, 'I');
            const sendPub = bundles[0].message.pk;
            const verified = tools.verify(msg.root, message.sign, sendPub);
            /* TODO: signature verification */
            if (verified) {
              return {
                id: msg.id,
                root: msg.root,
                sideKey: msg.sideKey,
              };
            }
          } catch (err) {
            console.log(err);
          }
        })));
    console.log('Fetched roots:', roots);
    const messages = {};

    /* TODO: filter messages in contact */
    // var contactRoots = roots.filter(msg => msg.id in contacts)
    const contactRoots = roots;

    /* fetch from local */
    const localmsg = this.messageStore.findOnly({ id: uuid }).messages;
    // console.log('local:', localmsg)

    await Promise.all(contactRoots.map(async (tx) => {
      const { id, root, sideKey } = tx;
      messages[id] = [];

      /* fetch from tangle */
      await Mam.fetch(root, 'restricted', sideKey, (tryte) => {
        const data = JSON.parse(iota.utils.fromTrytes(tryte));
        data.fromSelf = false;
        messages[id].push(data); /* data wrapped message and other things */
      });
    }));

    Object.keys(localmsg).map((id) => {
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
    console.log(messages);

    return messages;
  }

  async sendMamMsg(packet, params, mamState) {
    console.log('sendMamMsg');

    let recvPub = await Cert.getBundles(params.receiver, 'I');
    if (recvPub.length !== 1) { console.log('error: Get initial claim failed'); }
    recvPub = recvPub[0].message.pk;

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

  addContact(userID, contactorID) {
    const store = this.contactStore.findOnly({ id: userID });
    if (contactorID in store.contacts) {
      console.log('[ERROR] error adding exist contact');
      return;
    }
    store.contacts[contactorID] = {};
    this.contactStore.update(store);
  }

  async initMamClaim(params) {
    console.log('initMamClaim');
    // console.log(params)
    const receiverBundles = await Cert.getBundles(params.receiver, 'I');
    const receiverPublicKey = receiverBundles[0].message.pk;
    // console.log('recvPub:', receiverPublicKey)

    const senderPrivateKey = this.accountStore.findOnly({ id: params.sender }).sk;
    // console.log('sendPriv:', senderPrivatyKey)

    const state = this.getInitMamState(params);
    const root = Mam.getRoot(state);
    const sideKey = state.channel.side_key;
    // console.log(root)
    const info = {
      id: params.sender,
      root,
      /* TODO: find proper key length */
      sideKey,
    };
    const enc = tools.encrypt(JSON.stringify(info), receiverPublicKey);
    const packet = {
      msg: enc,
      sign: tools.sign(root, senderPrivateKey),
    };

    if (debug) {
      console.log('id: ', params.sender);
      console.log('root: ', root);
      console.log(`len:${JSON.stringify(packet).length}`);
    }

    await Cert.attach(JSON.stringify(packet), params.receiver, 'M', null);
  }


  getInitMamState(params) {
    console.log('getInitMamState');

    const store = this.contactStore.findOnly({ id: params.sender });

    /* init mam state */
    let mamState = Mam.init(iota);
    mamState = Mam.changeMode(mamState, 'restricted', tools.seedGen(56));

    /* update next_root, doesn't care return value */
    Mam.create(mamState, 'INITIALMESSAGE');

    store.contacts[params.receiver] = {
      activeMamState: deepCopy(mamState),
    };


    if (debug) { console.log('Store updated: ', store); }

    this.contactStore.update(store);

    return deepCopy(mamState);
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
