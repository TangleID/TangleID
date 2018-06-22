const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');
const crypto = require('crypto');
const ursa = require('ursa');

const d64 = data => nacl.util.decodeBase64(data);

const e64 = data => nacl.util.encodeBase64(data);

const dUTF = data => nacl.util.decodeUTF8(data);

const eUTF = data => nacl.util.encodeUTF8(data);

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

const sign = (msg, sk) => e64(crypto.privateEncrypt(eUTF(d64(sk)), Buffer.from(dUTF(msg))));

const signHash = (msg, sk) => sha256(e64(crypto.privateEncrypt(eUTF(d64(sk)), Buffer.from(dUTF(msg))))); // eslint-disable-line max-len
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

module.exports = {
  keypair,
  sha256,
  uuid,
  sign,
  signHash,
  encrypt,
  decrypt64,
  decryptUTF,
  generatePacket,
  d64,
  e64,
  dUTF,
  eUTF,
};
