const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');
const crypto = require('crypto');
const ursa = require('ursa');

const keypair = () => {
  const keys = ursa.generatePrivateKey(2048, 65537);

  const priv = keys.toPrivatePem('base64');
  const pub = keys.toPublicPem('base64');

  return { pub, priv };
};

const sha256 = (data) => {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
};


const uuid = () => {
  const ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
  let id = '';
  for (let i = 0; i < 26; i++) {
    id += ch.charAt(Math.floor(Math.random() * ch.length));
  }
  return id;
};

const verify = async (msg, sig, issuerID) => {
  const issuer = await Iota.getBundles(issuerID, 'I');
  return eUTF(crypto.publicDecrypt(eUTF(d64(issuer[0].message.pk)), Buffer.from(d64(sig)))) === msg;
};

const verifyHash = async (root, sig, issuerID) => {
  const issuer = await Iota.getBundles(issuerID, 'I');
  return eUTF(crypto.publicDecrypt(eUTF(d64(issuer[0].message.pk)), Buffer.from(d64(sig)))) === sha256(root);
};

const sign = (msg, sk) => e64(crypto.privateEncrypt(eUTF(d64(sk)), Buffer.from(dUTF(msg))));

const signHash = (msg, sk) => sha256(e64(crypto.privateEncrypt(eUTF(d64(sk)), Buffer.from(dUTF(msg)))));
// Encrypt data for transmit
const encrypt = (msg, pk) => e64(crypto.publicEncrypt(eUTF(d64(pk)), Buffer.from(dUTF(msg))));

// Decrypt data
const decryptUTF = (msg, sk) => eUTF(crypto.privateDecrypt(eUTF(d64(sk)), Buffer.from(d64(msg))));

const decrypt64 = (msg, sk) => e64(crypto.privateDecrypt(eUTF(d64(sk)), Buffer.from(d64(msg))));

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


const d64 = data => nacl.util.decodeBase64(data);

const e64 = data => nacl.util.encodeBase64(data);

const dUTF = data => nacl.util.decodeUTF8(data);

const eUTF = data => nacl.util.encodeUTF8(data);

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
  eUTF,
};
