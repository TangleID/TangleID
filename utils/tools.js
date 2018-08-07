const forge = require('node-forge');
const crypto = require('crypto');

const d64 = data => forge.util.decode64(data);
const e64 = data => forge.util.encode64(data);
const dUTF = data => forge.util.decodeUtf8(data);
const eUTF = data => forge.util.encodeUtf8(data);

const generateKeyPair = () => {
  const keypair = forge.pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
  return {
    pk: forge.pki.publicKeyToPem(keypair.publicKey),
    sk: forge.pki.privateKeyToPem(keypair.privateKey),
  };
};

const seedGen = (length) => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
  let result = '';
  const buf = crypto.randomBytes(4 * length);
  for (let i = 0; i < length; ++i) {
    result += charset.charAt(buf.readUInt32LE(i) % charset.length);
  }
  return result;
};

const generateUuid = () => seedGen(26);

const sign = (msg, privateKeyPem) => {
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  const md = forge.md.sha256.create();
  md.update(msg);
  return e64(privateKey.sign(md));
};

const verify = (msg, signature, publicKeyPem) => {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const md = forge.md.sha256.create();
  md.update(msg);
  return publicKey.verify(md.digest().bytes(), d64(signature));
};

// Encrypt data for transmit
const encrypt = (msg, publicKeyPem) => {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  return e64(publicKey.encrypt(msg));
};

// Decrypt data
const decryptUTF = (msg, privateKeyPem) => {
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  return eUTF(privateKey.decrypt(d64(msg)));
};

const decrypt64 = (msg, privateKeyPem) => {
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  return e64(privateKey.decrypt(d64(msg)));
};


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

module.exports = {
  d64,
  e64,
  dUTF,
  eUTF,
  generateKeyPair,
  seedGen,
  generateUuid,
  sign,
  verify,
  encrypt,
  decrypt64,
  decryptUTF,
  generatePacket,
  generateInitialPacket,
};
