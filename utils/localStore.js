const loki = require('lokijs');

class Account {
  constructor(dbFileName, callback) {
    const self = this;
    // implement the autoloadback referenced in loki constructor

    const databaseInitialize = function () {
      self.accounts = self.db.getCollection('accounts');
      if (self.accounts === null) {
        self.accounts = self.db.addCollection('accounts');
      }
      callback();
    };

    this.db = new loki(dbFileName, {
      autoload: true,
      autoloadCallback: databaseInitialize,
      autosave: true,
      autosaveInterval: 4000,
    });
  }
  insert(params) {
    const result = this.accounts.insert(params);
    this.db.saveDatabase();
    return result;
  }

  update(params) {
    const result = this.accounts.update(params);
    this.db.saveDatabase();
    return result;
  }

  find(params) {
    return this.accounts.find(params);
  }

  findOnly(params) {
    const result = this.accounts.find(params);

    if (result.length !== 1) {
      console.log('[Error] more/less than one accounts are found:', result.length);
      return undefined;
    }

    return result[0];
  }

  findAll() {
    return this.accounts.find({});
  }

  remove(params) {
    return this.accounts.remove(params);
  }
}

class Contact {
  constructor(dbFileName, callback) {
    const self = this;
    // implement the autoloadback referenced in loki constructor

    const databaseInitialize = function () {
      self.contacts = self.db.getCollection('contacts');
      if (self.contacts === null) {
        self.contacts = self.db.addCollection('contacts');
      }
      callback();
    };

    this.db = new loki(dbFileName, {
      autoload: true,
      autoloadCallback: databaseInitialize,
      autosave: true,
      autosaveInterval: 4000,
    });
  }
  insert(params) {
    const result = this.contacts.insert(params);
    this.db.saveDatabase();
    return result;
  }

  update(params) {
    const result = this.contacts.update(params);
    this.db.saveDatabase();
    return result;
  }

  find(params) {
    return this.contacts.find(params);
  }

  findOnly(params) {
    const result = this.contacts.find(params);

    if (result.length !== 1) {
      console.log('[Error] more/less than one contacts are found:', result.length);
      return undefined;
    }

    return result[0];
  }

  findAll() {
    return this.contacts.find({});
  }

  remove(object) {
    return this.contacts.remove(object);
  }
}

class Message {
  constructor(dbFileName, callback) {
    const self = this;
    // implement the autoloadback referenced in loki constructor

    const databaseInitialize = function () {
      self.messages = self.db.getCollection('messages');
      if (self.messages === null) {
        self.messages = self.db.addCollection('messages');
      }
      callback();
    };

    this.db = new loki(dbFileName, {
      autoload: true,
      autoloadCallback: databaseInitialize,
      autosave: true,
      autosaveInterval: 4000,
    });
  }
  insert(params) {
    const result = this.messages.insert(params);
    this.db.saveDatabase();
    return result;
  }

  update(params) {
    const result = this.messages.update(params);
    this.db.saveDatabase();
    return result;
  }

  find(params) {
    return this.messages.find(params);
  }

  findOnly(params) {
    const result = this.messages.find(params);

    if (result.length !== 1) {
      console.log('[Error] more/less than one id are found:', result.length);
      return undefined;
    }

    return result[0];
  }
  findAll() {
    return this.messages.find({});
  }

  remove(object) {
    return this.messages.remove(object);
  }
}

module.exports = {
  Account,
  Contact,
  Message,
};
