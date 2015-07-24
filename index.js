/*!
 * dependencies
 */

var request = require('request'),
    config = require('./config');

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
 * get auth headers
 */

Bitproof.prototype.getAuthHeaders = function() {
  return { 
    'API_KEY': this.key,
    'API_SECRET': this.secret
  }; 
}

/*!
 * send hex to Bitproof
 */

Bitproof.prototype.push = function(hex, success, err) {
  // check routine could be done locally

  var options = {
    uri: config.urls.push,
    headers: this.getAuthHeaders(),
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
};

/*!
 * get hex from Bitproof
 */

Bitproof.prototype.read = function(txid, success, err) {
  // we could add options, such as output limits / include metadata

  var options = {
    uri: config.urls.read,
    method: 'GET',
    qs: {
      txid: txid
    }
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      success(body);
    } else {
      err(error);
    }
  });
};

module.exports = Bitproof;