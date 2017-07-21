var config = require('../config')

var Tweety = require('./tweety')
var Wallet = require('./wallet')
    Wallet.init()

function Router() {
}

Router.getCmd = function (str) {
  switch (true) {
    case /status/.test(str):
      return 'status'
      break;
    case /balance/.test(str):
      return 'balance'
      break;
    case /deposit/.test(str):
      return 'deposit'
      break;
    case /withdraw/.test(str):
      return 'withdraw'
      break;
    case /tip/.test(str):
      return 'tip'
      break;
    default:
      return 'undefined'
      break;
  }
}
Router.executeCmd = function (user, cmd, opt = null) {
  switch(cmd) {
    case 'status':
      Wallet.getStatus(function (status) {
        Tweety.sendTweet(user, Tweety.getTweet(cmd, status))
      })
      break;
    case 'balance':
      Wallet.getBalance(user.id, function (balance) {
        Tweety.sendTweet(user, Tweety.getTweet(cmd, [{
          id: 'balance',
          val: balance
        }]))
      })
      break;
    case 'deposit':
      Wallet.getAddress(user.id, function (addr) {
        Tweety.sendTweet(user, Tweety.getTweet(cmd, [{
          id: 'addr',
          val: addr
        }]))
      })
      break;
    case 'withdraw':
      break;
    case 'tip':
      Wallet.transfer(user.id, opt.id, opt.amount, function (res) {
        if (res === true) {
          Tweety.sendTweet(user, Tweety.getTweet(cmd, [
            {
              id: 'sender',
              val: user.name
            },
            {
              id: 'amount',
              val: opt.amount
            },
            {
              id: 'receiver',
              val: opt.name
            }
          ]))
        } else if (res === false) {
          Tweety.sendTweet(user, Tweety.getTweet('error-balance'))
        }
      })
      break;
    case 'undefined':
      Tweety.sendTweet(user, Tweety.getTweet(cmd))
      break;
  }
}

module.exports = Router