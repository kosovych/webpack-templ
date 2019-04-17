const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = env => {
  console.log('NODE_ENV: ', env.NODE_ENV);
  return {
    entry: {
      app: './src/index.js'
    },

    output: {
      filename: 'js/[name].js',
      path: path.resolve(__dirname, './dist'),
      publicPath: '/'
    },

    module: {
      rules: [{
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
              loader: MiniCssExtractPlugin.loader,
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
      new CleanWebpackPlugin(),

      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
      }),
      new HtmlWebpackPlugin({
        filename: 'blog.html',
        template: 'src/blog.html',
      }),
      new HtmlWebpackPlugin({
        filename: 'post.html',
        template: 'src/post.html',
      }),
      new MiniCssExtractPlugin({
        // filename: 'main.css', dev
        filename: env.NODE_ENV == 'build' ? 'css/main.css' : '',

        // chunkFilename: '[id].css',
      }),
      new CopyPlugin([{
        from: 'src/img',
        to: './img',
        toType: 'dir',
      }, ]),
    ],

    devServer: {
      overlay: true,
      contentBase: path.join(__dirname, 'dist'),
      port: 3000,
      open: true,
      publicPath: '/'
    }
  }
}