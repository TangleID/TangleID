/*

iotalk is a privacy-minded messaging app built on the IOTA Tangle.
Copyright (C) 2017  xx10t4 <xx10t4@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

var loki = require('lokijs')

class accountStore {
	constructor(dbFileName, callback){
		var self = this
		// implement the autoloadback referenced in loki constructor

		var databaseInitialize = function() {
			self.accounts = self.db.getCollection('accounts')
			if ( self.accounts === null) {
				self.accounts = self.db.addCollection('accounts')
			}
			callback()
		}

		this.db = new loki(dbFileName, {
			autoload: true,
			autoloadCallback: databaseInitialize,
			autosave: true,
			autosaveInterval: 4000
		})

	}
	insert(params) {
		var result = this.accounts.insert(params)
		this.db.saveDatabase()
		return result
	}

	update(params) {
		var result = this.accounts.update(params)
		this.db.saveDatabase()
		return result
	}

	find(query) {
		return this.accounts.find(query)
	}

	all() {
		return this.accounts.find({})
	}

	remove(object) {
		return this.accounts.remove(object)
	}
}

module.exports = accountStore
