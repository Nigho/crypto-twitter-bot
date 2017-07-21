var config = require('../config')
var coin = require('../coins/' + config.coin)

function Utils() {
}

Utils.random = function (len) {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var ran = '';
	for (var i = 0; i< len; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		ran += chars.substring(rnum, rnum + 1);
	}
	return ran
}
Utils.AddrRegex = function (opts) {
  opts = Object.assign({}, opts);
  const regex = '(?:[' + coin.prefix +'][a-km-zA-HJ-NP-Z1-9]{25,34})';
  return opts.exact ? new RegExp('(?:^' + regex + '$)') : new RegExp(regex, 'g');
}

module.exports = Utils