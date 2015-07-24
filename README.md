# Bitproof for Node.js


### Installation

You can install Bitproof with npm:

```sh
$ npm install bitproof
```

### Certify
```javascript
// dependencies
var Bitproof = require('bitproof');

// Find your API credentials in your Bitproof Dashboard
var notary = new Bitproof(YOUR_API_KEY, YOUR_SECRET_KEY);

// push some hex in the blockchain
notary.push(HEX_UP_TO_40_BYTES, function(result) {
    console.log(result);
}, function(err) {
    console.log(err);
});
```

### Read a proof
```javascript
// dependencies
var Bitproof = require('bitproof');

// no API keys are needed for read only
var notary = new Bitproof();

// read some hex in the blockchain
var transactionId = 'e65a501b8caab14cea934e5aff06a82110ed152cc6c6d62a5b5146dc9dc21dae';
notary.read(transactionId, function(result) {
    console.log(result);
}, function(err) {
    console.log(err);
});
```

**Applications using Bitproof for Node.js**

- [Bitproof](https://bitproof.io/)
- Contact us to be here
