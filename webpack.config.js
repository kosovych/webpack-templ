const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: (url, resourcePath, context) => {
              return `img/${url}`
            }
          }
        },
      },
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },

      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [{
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          }
        ],
      },


    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'blog.html',
      template: 'src/blog.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'post.html',
      template: 'src/post.html',
    }),
    new CopyPlugin([
      {
      from: 'src/img',
      to: './img',
      toType: 'dir',
      },
     ]),
  ],


  devServer: {
    overlay: true,
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    open: true,
    publicPath: '/'
  }
}