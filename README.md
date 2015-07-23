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

**Applications using Bitproof for Node.js**

- [Bitproof](https://bitproof.io/)
- Contact us to be here
