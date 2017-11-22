import Iota from "./iota";
import Verify from "./verify";

var nacl = require("tweetnacl");
nacl.util = require("tweetnacl-util");
var crypto = require('crypto');

class TangleCerts {
  // Generate a keypair
  static generate = () => {

    /* Just for testing */
    var publicKey = 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FEZEVwLzV2S1JoL3AvN3A5MGFuZHd0WS9VSwprSUlCbUtSZjk4V2lEY0k3SXY2T2ovd29vYUhNcGNnNTZydlN5OHNlWmxJaXFZSk5uZzBhNjJMUjlmT0ZKdGlXCjlvdjl5TWJNWVAra1BqV3pkdmdtVHBuelhUaUNHM2p3MFdua044bDNtaDRNVUN3R1J1QlFUbDZpak1HUjVzblQKMDNsYnRJT1lha1RUMnRDMmZ3SURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ=='
    var privateKey = 'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlDWEFJQkFBS0JnUURkRXAvNXZLUmgvcC83cDkwYW5kd3RZL1VLa0lJQm1LUmY5OFdpRGNJN0l2Nk9qL3dvCm9hSE1wY2c1NnJ2U3k4c2VabElpcVlKTm5nMGE2MkxSOWZPRkp0aVc5b3Y5eU1iTVlQK2tQald6ZHZnbVRwbnoKWFRpQ0czancwV25rTjhsM21oNE1VQ3dHUnVCUVRsNmlqTUdSNXNuVDAzbGJ0SU9ZYWtUVDJ0QzJmd0lEQVFBQgpBb0dBZkI1bjJQUHpxdDBsZjBvWTFrZkpCV2I0ZmV6eVFPa3RhSUFZNHNvc3diejlCSmVNY0ZlSEd2bjg5NTkxCnduME8xa3VHVTlXdHhkdzE2V1k4dmpzRGREUWdLODU2eEhwdVI5QWdHRXNwRytwM0E0VmN6VTRGckZ2K0ozRkgKekxFclNNRnBlTkpOZFpGcDZybkRUcExiQWcvWHJEc0VHejBiczFod2NlczBtbEVDUVFENGJDK2xlNG5qd2FMaQozR2UrRW9BbEF3QmtPMkNsNm5BWEFiMUE2VS9aUTRpeDYvUXlhcUREVk5jNXdVZ0FIUm44aWh6WE5FZWdOM0J1CnRDTFhhZzFuQWtFQTQ5RGdlQzZlM3BmWU85QVFXTCtjV21CckhtcCtXazM5dnVhN3llU0pwZUxXT1ZwYS9qT08KT1E0SFpBcDNIMkRiT0ZJS1RhS1QrOTdJR2RGV2R0dEhLUUpBSnhtSUNraStkRDJHOEtQMkpDRnZUK1FBRE1hWAp1S1dFak9wMktpQk90QWlBSEZqaDc0bCswaCtwWEdyQ2RWb2ZPL05WQkw0eXc5SFYvV2FXMFViYzR3SkJBSk9oCnVyVm5VT0RpK2VmWTc1N3puUGtjWG81NWFLUlF3azFCN1JQcW5DRDZIT1ZSM29HNUcwTnlDZXdVdEJtTGhNUzgKdFp5VjdOeGVCTUptWEdmdHRmRUNRQ3lpZzI3aE4rUlRXbENoU2RJZUtwT2JpU09xOVIySE52U3ZjdlliempJYwpjYTFMVzBLNUxJc0VEOCtrRkVWeSs1N3pCNEZidkdWczVLc0Z6MWFiZmpnPQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQ=='

    return {
      publicKey: publicKey,
      secretKey: privateKey
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
    return e64(crypto.privateEncrypt(eUTF(d64(sk)), Buffer(dUTF(msg))));
  };

  // Encrypt data for transmit
  static encrypt = (msg, pk) => {
    return e64(crypto.publicEncrypt(eUTF(d64(pk)), Buffer(dUTF(msg))));
  };

  // Decrypt data
  static decryptUTF = (msg, sk) => {
    return eUTF(crypto.privateDecrypt(eUTF(d64(sk)), Buffer(d64(msg))));
  };

  static decrypt64 = (msg, sk) => {
    return e64(crypto.privateDecrypt(eUTF(d64(sk)), Buffer(d64(msg))));
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
