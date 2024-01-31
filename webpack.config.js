const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.wasm$/,
        type: 'webassembly/experimental'
      }
    ]
  }
};