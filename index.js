/*!
 * dependencies
 */

var request = require('request');
var config = require('./config');

/*!
 * init
 */

function Bitproof(key, secret) {

  // Auth
  this.key = key;
	this.secret = secret;

	// we should test auth right now
}

/*!
 * send hex to Bitproof
 */

Bitproof.prototype.push = function(hex, success, err) {
  // check routine could be done locally

  var options = {
    uri: config.urls.push,
    headers: {
      'API_KEY': this.key,
      'API_SECRET': this.secret
    },
    method: 'POST',
    json: {
      "data": hex
    }
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      success(body);
    } else {
      err(error);
    }
  });
}

module.exports = Bitproof;