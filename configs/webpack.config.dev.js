const path = require('path');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const configureDevTool = () => '#cheap-module-eval-source-map';

const configureScssLoader = () => ({
  test: /\.(scss|css)$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: { importLoaders: 2, sourceMap: true }
    },
    { loader: 'postcss-loader', options: { sourceMap: true } },
    { loader: 'sass-loader', options: { sourceMap: true } }
  ]
});

const config = merge(webpackConfig, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, '../src'),
    watchContentBase: true,
    compress: true,
    port: 8000,
    hot: true
  },
  watch: true,
  devtool: configureDevTool(),
  module: {
    rules: [configureScssLoader()],
  },
  optimization: {
    minimize: false,
  },
});
module.exports = config;
