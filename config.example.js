var config = {}

config.coin = 'bitcoin' // coins/*.json

config.name = 'BitcoinTipBot' // @ name of the bots twitter account
config.twitter = {
  consumer_key: 'consumer_key',
  consumer_secret: 'consumer_secret',
  access_token: 'access_token',
  access_token_secret: 'access_token_secret'
}
config.rpc = {
  host: 'localhost',
  user: 'user',
  pass: 'pass',
  port: 9332
}

module.exports = config