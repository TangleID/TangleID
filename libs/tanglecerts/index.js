var nacl = require("tweetnacl");
nacl.util = require("tweetnacl-util");

class TangleCerts {
  // Generate a keypair
  static generate = () => {
    var pair = nacl.sign.keyPair();
    console.log(pair);
    this.setState({ pair: pair });
  };
  // Generate a 13 byte  uuid
  uuid = () => {
    var ALPHABET =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var ID_LENGTH = 13;
    var rtn = "";
    for (var i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    console.log(rtn);
    this.setState({ uuid: rtn });
  };
  // Create a signature for data
  static sign = (msg, sk) => {
    var sig = nacl.sign.detached(nacl.util.decodeUTF8(msg), sk);
    console.log(sig);
    this.setState({ sig: sig });
    this.generatePacket(msg, sig);
  };

  // Creat 
  static generatePacket = (uuid, msg, sig) => {
    this.setState({
      packet: JSON.stringify({
        cert: msg,
        signature: nacl.util.encodeBase64(sig),
        issuer: "jeff"
      })
    });
  };

  static verify = (sig, pk) => {
    var message = nacl.sign.open(
      nacl.util.decodeBase64(sig),
      nacl.util.decodeBase64(pk)
    );
    console.log(message);
    this.setState({ verified: message });
  };
}

export default TangleCerts;
