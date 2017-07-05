import Iota from "./iota";
var nacl = require("tweetnacl");
nacl.util = require("tweetnacl-util");

class TangleCerts {
  // Generate a keypair
  static generate = () => {
    var keys = nacl.sign.keyPair();
    return {
      publicKey: nacl.util.encodeBase64(keys.publicKey),
      secretKey: nacl.util.encodeBase64(keys.secretKey)
    };
  };
  // Generate a 13 byte uuid
  static uuid = () => {
    var ALPHABET =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var ID_LENGTH = 13;
    var rtn = "";
    for (var i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
  };
  // Create a signature for data
  static sign = (msg, sk) => {
    return e64(nacl.sign.detached(dUTF(msg), d64(sk)));
  };

  // Create
  static generatePacket = (issuerID, msg, sig) => {
    return {
      claim: msg,
      signature: sig,
      issuer: issuerID
    };
  };

  // Create
  static generateInitalPacket = (uuid, msg, sig, pk) => {
    return {
      claim: msg,
      signature: sig,
      pk: pk,
      id: uuid
    };
  };

  static verify = (msg, sig, pk) => {
    return nacl.sign.detached.verify(dUTF(msg), d64(sig), d64(pk));
  };

  static iota = Iota;
}

export default TangleCerts;

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
