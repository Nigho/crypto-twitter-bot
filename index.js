var fs = require('fs')
// Check if requiring files are working
if (!fs.existsSync('./config.js')) {
  console.error('config.js is missing - Please create a config file first')
  process.exit()
}
if (!fs.existsSync('./coins/' + config.coin + '.json')) {
  console.error('coins/' + config.coin + '.json is mssing - Please create a coin config file first')
  process.exit()
}

var config = require('./config')

var Tweety = require('./lib/tweety')
var Router = require('./lib/router')
var Utils  = require('./lib/utils')

var moment = require('moment')

var stream = Tweety.init()
stream.on('tweet', function (tweet) {
  var user = {
    tweet_id: tweet.id_str,
    id: tweet.user.id_str,
    name: '@' + tweet.user.screen_name,
    screen_name: tweet.user.screen_name
  }
  // Don't do anything if it's my reply!
  if (config.name === user.screen_name) return
  // Remove username from content
  var content = tweet.text.replace(user.name, '') // TODO: Check if unneeded
  // Check for coin address within content
  var addrs = content.match(Utils.AddrRegex())
  // Filter command out of the content
  var cmd = Router.getCmd(content)
  if (cmd === 'tip') {
    var opt = {
      id: null,
      name: null,
      screen_name: null,
      amount: null
    }
    // Get mentioned user(s)
    opt.id = tweet.entities.user_mentions[1].id_str
    opt.name = '@' + tweet.entities.user_mentions[1].name
    opt.screen_name = tweet.entities.user_mentions[1].screen_name
    // Get amount (4 part of string)
    opt.amount = parseFloat(content.split(' ')[3].trim())
  }
  if (cmd === 'withdraw') {
    var opt = {
      address: null,
      amount: null
    }
    // Get address & amount
    opt.address = addrs[0]
    opt.amount = parseFloat(content.split(' ')[3].trim())
  }
  // Execute command
  Router.executeCmd(user, cmd, opt)
})

// TODO: Bot is reacting to @MachinecoinTime tweets ~ fix this