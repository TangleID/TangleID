import Iota from "./iota";

export default class Verify {
  static initial = (msg, sig, pk) => {
    try {
      return nacl.sign.detached.verify(dUTF(msg), d64(sig), d64(pk));
    } catch (e) {
      Error("Verifying inital claim threw an error");
      return e;
    }
  };
  static claim = async (msg, sig, issuerID) => {
    var issuer = await Iota.getBundles(issuerID, "I");
    return nacl.sign.detached.verify(dUTF(msg), d64(sig), d64(issuer.pk));
  };
}
