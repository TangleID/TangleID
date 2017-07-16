import Iota from "./iota";
import Verify from "./verify";

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
  // Generate a 26 tryte uuid
  static uuid = () => {
    var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
    var ID_LENGTH = 26;
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
  static generatePacket = (issuerID, msg, sig, receiverID) => {
    return {
      claim: msg,
      signature: sig,
      issuer: issuerID,
      id: receiverID
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

  static verify = Verify;

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
