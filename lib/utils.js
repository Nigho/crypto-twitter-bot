var config = require('../config')
var coin = require('../coins/' + config.coin)

function Utils() {
}

Utils.AddrRegex = function (opts) {
  opts = Object.assign({}, opts);
  const regex = '(?:[' + coin.prefix +'][a-km-zA-HJ-NP-Z1-9]{25,34})';
  return opts.exact ? new RegExp('(?:^' + regex + '$)') : new RegExp(regex, 'g');
}

module.exports = Utils