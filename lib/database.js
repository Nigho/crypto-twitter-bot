var config = require('../config')
var coin = require('../coins/' + config.coin)

var Engine = require('tingodb')()

function Database() {
  var db = null
}

Database.init = function () {
  Database.db = new Engine.Db(config.storage, {});
}
Database.query = function () {
  
}
Database.get = function () {
  
}
Database.insert = function () {
  
}
Database.delete = function () {
  
}

module.exports = Database