const forge = require('node-forge');
const crypto = require('crypto');

const keypair = () => {
  const rsa = forge.pki.rsa;
  const keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001});
  const pk = tools.e64(forge.pki.publicKeyToPem(keypair.publicKey));
  const sk = tools.e64(forge.pki.privateKeyToPem(keypair.privateKey));
  return { sk, pk };
};


const uuid = () => {
  const ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
  let id = '';
  for (let i = 0; i < 26; i++) {
    id += ch.charAt(Math.floor(Math.random() * ch.length));
  }
  return id;
};

const sign = (msg, sk) => {
  sk = forge.pki.privateKeyFromPem(sk);
  const md = forge.md.sha256.create();
  md.update(msg);
  return e64(sk.sign(md));
}

const verify = (msg, sign, pk) => {
  pk = forge.pki.publicKeyFromPem(pk);
  const md = forge.md.sha256.create();
  md.update(msg);
  return pk.verify(md.digest().bytes(), d64(sign));
}

// Encrypt data for transmit
const encrypt = (msg, pk) => {
  pk = forge.pki.publicKeyFromPem(pk);
  return e64(pk.encrypt(msg));
}

// Decrypt data
const decryptUTF = (msg, sk) => {
  sk = forge.pki.privateKeyFromPem(sk);
  return eUTF(sk.decrypt(d64(msg)));
}

const decrypt64 = (msg, sk) => {
  sk = forge.pki.privateKeyFromPem(sk);
  return e64(sk.decrypt(d64(msg)));
}


// Create
const generatePacket = (issuerID, msg, sig, receiverID) => ({
  claim: msg,
  signature: sig,
  issuer: issuerID,
  id: receiverID,
});

// Create
const generateInitialPacket = (uuid, msg, sig, pk) => ({
  claim: msg,
  signature: sig,
  pk,
  id: uuid,
});


const d64 = data => forge.util.decode64(data);

const e64 = data => forge.util.encode64(data);

const dUTF = data => forge.util.decodeUtf8(data);

const eUTF = data => forge.util.encodeUtf8(data);

module.exports = {
  keypair,
  uuid,
  sign,
  verify,
  encrypt,
  decrypt64,
  decryptUTF,
  generatePacket,
  generateInitialPacket,
  d64,
  e64,
  dUTF,
  eUTF,
};
