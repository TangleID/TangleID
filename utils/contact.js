var loki = require("lokijs")

class contactStore {
  constructor(dbFileName, callback){
    var self = this
    // implement the autoloadback referenced in loki constructor

    var databaseInitialize = function() {
      self.contacts = self.db.getCollection("contacts");
      if ( self.contacts === null) {
        self.contacts = self.db.addCollection("contacts");
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
    var result = this.contacts.insert(params)
    this.db.saveDatabase()
    return result
  }

  update(params) {
    var result = this.contacts.update(params)
    this.db.saveDatabase()
    return result
  }

  find(query) {
    return this.contacts.find(query)
  }

  findOnly(query) {
    var result = this.contacts.find(query)

    if(result.length !== 1) {
      console.log('[Error] more/less than one contacts are found:', result.length)
      return undefined
    }

    return result[0]
  }

  all() {
    return this.contacts.find({})
  }

  remove(object) {
    return this.contacts.remove(object)
  }
}

module.exports = contactStore
