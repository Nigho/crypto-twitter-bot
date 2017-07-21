var config = require('../config')
var coin = require('../coins/' + config.coin)

var Twit = require('twit')
var moment = require('moment')

function Tweety() {
  var twitter = null
  var stream = null
  var templates = null
}

Tweety.templates = {
  'status': 'Wallet version {{version}} @ block {{height}} using {{peers}} peers',
  
  'balance': 'Your balance is: {{balance}} ' + coin.ticker,
  'deposit': 'Your deposit address is: {{addr}}',
  'withdraw': 'Success: {{txid}}',
  
  'tip': '{{sender}} tipped {{amount}} ' + coin.ticker + ' to {{receiver}}',
  
  'giveaway-create': '{{creator}} created an giveaway. Retweet to claim',
  'giveaway-ended': '{{creator}}´s giveaway has already ended',
  'giveaway-claim-success': '{{claimer}} successfully claimed {{amount}} ' + coin.ticker + ' from {{creator}}´s giveaway',
  'giveaway-claim-already': 'You`ve already claimed this giveaway',
  
  'error-balance': 'Sorry, but your balance is insufficient | withdraw fee is ' + coin.txFee + ' ' + coin.ticker,
  
  'undefined': 'Please submit a valid command'
}

Tweety.init = function () {
  Tweety.twitter = new Twit({
    consumer_key:         config.twitter.consumer_key,
    consumer_secret:      config.twitter.consumer_secret,
    access_token:         config.twitter.access_token,
    access_token_secret:  config.twitter.access_token_secret,
    timeout_ms:           60 * 1000
  })
  Tweety.stream = Tweety.twitter.stream('user', {
    replies: 'all'
  })
  return Tweety.stream
}
Tweety.getTweet = function (cmd, params = []) {
  var time = ' [' + moment().format() + ']'
  var content = Tweety.templates[cmd] + time
  
  params.forEach(function (param) {
    console.log(params)
    let id = param.id
    let val = param.val
    
    content = content.replace('{{' + id + '}}', val)
  })
  return content
}
Tweety.sendTweet = function (user, content) {
  Tweety.twitter.post('statuses/update', {
    in_reply_to_status_id: user.tweet_id,
    status: user.name + ' ' + content
  }, function (err, data, res) {
    console.log(err)
    console.log('Sent Tweet - ' + user.name)
  })
}

module.exports = Tweety