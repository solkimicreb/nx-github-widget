'use strict'

module.exports = {
  entry: "./widget/index.js",
  output: {
      path: __dirname,
      filename: "index.js"
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: 'to-string!css?importLoaders=1' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url?limit=10000000' }
    ]
  }
}
