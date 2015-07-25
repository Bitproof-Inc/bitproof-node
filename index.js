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

Bitproof.prototype.getAuthHeaders = function () {
    return {
        'API_KEY': this.key,
        'API_SECRET': this.secret
    };
};

/*!
 * get push options
 */

Bitproof.prototype.pushOptions = function (hex) {
    return {
        uri: config.urls.push,
        headers: this.getAuthHeaders(),
        json: {
            data: hex
        }
    };
};

/*!
 * send hex to Bitproof
 */

Bitproof.prototype.push = function (hex, success, err) {
    // check routine could be done locally

    request.post(this.pushOptions(hex), function (error, response, body) {
        if (!error && response.statusCode == 200) {
            success(body);
        } else {
            err(error);
        }
    });
};

/*!
 * get read options
 */

Bitproof.prototype.readOptions = function (txid) {
    return {
        uri: config.urls.read,
        qs: {
            txid: txid
        }
    };
};

/*!
 * get hex from Bitproof
 */

Bitproof.prototype.read = function (txid, success, err) {
    // we could add options, such as output limits / include metadata

    request.get(this.readOptions(txid), function (error, response, body) {
        if (!error && response.statusCode == 200) {
            success(body);
        } else {
            err(error);
        }
    });
};

module.exports = Bitproof;