const IOTA = require('iota.lib.js');

const defaultNode = process.env.BACKEND;
const iota = new IOTA({
  provider: defaultNode,
});

console.log('defaultNode', defaultNode);

module.exports = iota;
