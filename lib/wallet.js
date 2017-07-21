var config = require('../config')

var bitcoin = require('bitcoin')

function Wallet() {
  var rpc = null
}

Wallet.init = function () {
  Wallet.rpc = new bitcoin.Client({
    host: config.rpc.host,
    user: config.rpc.user,
    pass: config.rpc.pass,
    port: config.rpc.port,
    timeout: 10000
  })
}
Wallet.getStatus = function (next) {
  Wallet.rpc.cmd('getinfo', function (err, info) {
    if (err) next()
    else {
      var status = [
        {
          id: 'version',
          val: info.version
        },
        {
          id: 'height',
          val: info.blocks
        },
        {
          id: 'peers',
          val: info.connections
        }
      ]
      next(status)
    }
  })
}
Wallet.getBalance = function (user, next) {
  Wallet.rpc.getBalance(user, 4, function (err, balance) {
    if (err) next()
    else next(balance.toFixed(8))
  })
}
Wallet.transfer = function (sender, receiver, amount, next) {
  // Check balance of sender
  Wallet.getBalance(sender, function (balance) {
    console.log(balance)
    console.log(amount)
    if (balance >= amount) { // Enough balance
      Wallet.rpc.cmd('move', sender, receiver, amount, function (err, res) {
        if (err) next()
        else next(true)
      })
    } else { // Insufficient balance
      next(false)
    }
  })
}
Wallet.getAddress = function (user, next) {
  Wallet.rpc.cmd('getaddressesbyaccount', user, function (err, addrs) {
    if (err) next()
    else {
      if (addrs.length > 0) next(addrs[0])
      else {
        Wallet.generateAddress(user, function (addr) {
          next(addr)
        })
      }
    }
  })
}
Wallet.generateAddress = function (user, next) {
  Wallet.rpc.cmd('getnewaddress', user, function (err, addr) {
    if (err) next()
    else next(addr)
  })
}

module.exports = Wallet