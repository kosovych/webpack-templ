const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
        
      }
    ]
  },
  devServer: {
    overlay: true,
    // contentBase: path.join(__dirname, 'dist'),
    // compress: true,
    port: 3000,
    // open: true,
    // publicPath: '/'
  }
}