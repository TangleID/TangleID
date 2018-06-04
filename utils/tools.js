const nacl = require('tweetnacl')
nacl.util = require('tweetnacl-util')
const crypto = require('crypto')
const ursa = require('ursa')

const keypair = () => {
  var keys = ursa.generatePrivateKey(2048, 65537);

  var priv = keys.toPrivatePem('base64');
  var pub = keys.toPublicPem('base64');

  return {pub, priv};
};

const sha256 = (data) => {
  const hash = crypto.createHash('sha256');
  hash.update(data)
  return hash.digest('hex')
}


const uuid = () => {
  const ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
  var id = '';
  for (var i = 0; i < 26; i++) {
    id += ch.charAt(Math.floor(Math.random() * ch.length));
  }
  return id;
};

const verify = async (msg, sig, issuerID) => {
  var issuer = await Iota.getBundles(issuerID, 'I');
  return eUTF(crypto.publicDecrypt(eUTF(d64(issuer[0].message.pk)), Buffer(d64(sig)))) === msg;
};

const verifyHash = async (root, sig, issuerID) => {
  var issuer = await Iota.getBundles(issuerID, 'I');
  return eUTF(crypto.publicDecrypt(eUTF(d64(issuer[0].message.pk)), Buffer(d64(sig)))) === sha256(root);
};

const sign = (msg, sk) => {
  return e64(crypto.privateEncrypt(eUTF(d64(sk)), Buffer(dUTF(msg))));
};

const signHash = (msg, sk) => {
  return sha256(e64(crypto.privateEncrypt(eUTF(d64(sk)), Buffer(dUTF(msg)))));
};
// Encrypt data for transmit
const encrypt = (msg, pk) => {
  return e64(crypto.publicEncrypt(eUTF(d64(pk)), Buffer(dUTF(msg))));
};

// Decrypt data
const decryptUTF = (msg, sk) => {
  return eUTF(crypto.privateDecrypt(eUTF(d64(sk)), Buffer(d64(msg))));
};

const decrypt64 = (msg, sk) => {
  return e64(crypto.privateDecrypt(eUTF(d64(sk)), Buffer(d64(msg))));
};

// Create
const generatePacket = (issuerID, msg, sig, receiverID) => {
  return {
    claim: msg,
    signature: sig,
    issuer: issuerID,
    id: receiverID
  };
};

// Create
const generateInitialPacket = (uuid, msg, sig, pk) => {
  return {
    claim: msg,
    signature: sig,
    pk: pk,
    id: uuid
  };
};


const d64 = data => {
  return nacl.util.decodeBase64(data);
};

const e64 = data => {
  return nacl.util.encodeBase64(data);
};

const dUTF = data => {
  return nacl.util.decodeUTF8(data);
};

const eUTF = data => {
  return nacl.util.encodeUTF8(data);
};

module.exports = {
  keypair,
  sha256,
  uuid,
  verify,
  verifyHash,
  sign,
  signHash,
  encrypt,
  decrypt64,
  decryptUTF,
  generatePacket,
  generateInitialPacket,
  d64,
  e64,
  dUTF,
  eUTF
}
