var loki = require("lokijs")

class messageStore {
  constructor(dbFileName, callback){
    var self = this
    // implement the autoloadback referenced in loki constructor

    var databaseInitialize = function() {
      self.messages = self.db.getCollection("messages");
      if ( self.messages === null) {
        self.messages = self.db.addCollection("messages");
      }
      callback()
    }

    this.db = new loki(dbFileName, {
      autoload: true,
      autoloadCallback: databaseInitialize,
      autosave: true,
      autosaveInterval: 4000
    });

  }
  insert(params) {
    var result = this.messages.insert(params)
    this.db.saveDatabase()
    return result
  }

  update(params) {
    var result = this.messages.update(params)
    this.db.saveDatabase()
    return result
  }

  find(query) {
    return this.messages.find(query)
  }

  findOnly(query) {
    var result = this.messages.find(query)

    if(result.length !== 1) {
      console.log('[Error] more/less than one id are found:', result.length)
      return undefined
    }

    return result[0]
  }
  all() {
    return this.messages.find({})
  }

  remove(object) {
    return this.messages.remove(object)
  }
}

module.exports = messageStore
