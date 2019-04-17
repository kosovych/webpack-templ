const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const minifyOption = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
};

module.exports = (env) => {
  console.log('NODE_ENV: ', env.NODE_ENV);
  return {
    entry: {
      app: './src/index.js',
    },

    output: {
      filename: 'js/[name].js',
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
            options: {
              options: {
                outputPath: '/fonst',
              },
            },
          },
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              outputPath: (url, resourcePath, context) => {
                return `img/${url}`;
              },
            },
          },
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
        },
        {
          test: /\.js$/,
          exclude: '/node_modules/',
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
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
            options: {url: false},
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: `./postcss.config.js`,
              },
            },
          },
          {
            loader: 'sass-loader',
          },
          ],
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),

      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
        minify: env.NODE_ENV == 'build' ? minifyOption : false,
      }),
      new MiniCssExtractPlugin({
        // filename: 'main.css', dev
        // filename: env.NODE_ENV == 'build' ? 'css/main.css' : 'css/main.css',
        filename: 'css/main.css',
        // chunkFilename: '[id].css',
      }),
      new CopyPlugin([{
        from: 'src/img',
        to: './img',
        toType: 'dir',
      }]),

      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
      }),
    ],

    devServer: {
      overlay: true,
      contentBase: path.join(__dirname, 'dist'),
      port: 3001,
      open: true,
      publicPath: '/',
    },
  };
};
