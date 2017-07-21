var config = require('../config')
var coin = require('../coins/' + config.coin)

var Database = require('./database')

function Giveaway() {
}

Giveaway.create = function (user, amount, claim, duration, next) {
  var giveaway = {
    user: user, // id of user who started the giveaway
    amount: amount, // maximal amount of coins to claim
    claim: claim, // amount to claim per user / retweet
    duration: duration, // duration of the giveaway in seconds
    created: Math.round(new Date().getTime() / 1000) // timestamp of giveaway creation
  }
  // TODO: Move coins to giveaway account
  // TODO: Create database entry
  // TODO: Create giveaway tweet (which should get retweeted)
}
Giveaway.get = function () {
}
Giveaway.claim = function () {
  // TODO: Check if giveaway is still running
  // TODO: Move coins from giveaway account to claimer
  // TODO: Add to database
  // TODO: Check if giveaway account still hold enough coins
}
Giveaway.end = function () {
  // TODO: Move remaining coins back to the users account
  // TODO: Note in database that the giveaway is over
}
Giveaway.check = function () {
  // TODO: Check if giveaway is still running
  // TODO: if not move coins back to creator
  // TODO: Note in database that the giveaway is over
  // TODO: Run this every 60 seconds
}

module.exports = Giveaway