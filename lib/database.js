var config = require('../config')
var coin = require('../coins/' + config.coin)

var Utils = require('./utils')

var Engine = require('tingodb')()

function Database() {
  var db = null
  var collection = null
}

Database.init = function () {
  Database.db = new Engine.Db(config.storage, {})
  Database.collection = Database.db.collection(config.coin)
}
Database.get = function (data, next) {
  Database.collection.findOne({
    data.id: data.val
  }, function(err, res) {
    next(res)
  })
}
Database.insert = function (data, next) {
  Database.collection.insert([data], function (err, res) {
    next(err, res)
  })
}
Database.delete = function () {
  
}

module.exports = Database