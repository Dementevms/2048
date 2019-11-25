const path = require('path');
const WebpackBar = require('webpackbar');

const configureBabelLoader = () => ({
  test: /\.(jsx?)$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
});

const config = {
  entry: path.resolve(__dirname, '../src', 'index'),
  output: {
    filename: 'main.js'
  },
  watchOptions: {
    ignored: ['node_modules'],
  },
  module: {
    rules: [configureBabelLoader()],
  },
  plugins: [
    new WebpackBar({
      name: '2048',
      profile: false,
    }),
  ]
};

module.exports = config;
