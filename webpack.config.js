const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const fs = require('fs');
require('dotenv').config();

const portConfig = JSON.parse(fs.readFileSync('src/config/port-config.json'))[0];

module.exports = {
  entry: ['@babel/polyfill', './src/client/index.js'],
  output: {
    // path: path.join(__dirname, '/dist'),
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        // pass all js files except for those in the node_modules folder through babel-loader
        // this transforms JSX to Javascript
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // pass all css files through style-loader (injects <style> tag in DOM) and css-loader (translates CSS into CommonJS)
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        // use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        // pass all scss files through style-loader, css-loader and sass-loader (compiles Sass to CSS, using Node Sass by default)
        test: /\.scss$/,
        resolve: {
          extensions: ['.scss'],
        },
        use: ['style-loader', 'css-loader', 'sass-loader'],
        // use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    https: {
      key: fs.readFileSync(path.join(__dirname, '/security/cert.key')),
      cert: fs.readFileSync(path.join(__dirname, '/security/cert.pem')),
      ca: fs.readFileSync(path.join(__dirname, '/security/cert.pem')),
    },
    publicPath: '/',
    historyApiFallback: true,
    port: portConfig.DEV_FRONTEND_SERVER_PORT,
    // proxy /api requests to https://localhost:<BACKEND_SERVER_PORT>/api during dev phase --> backend server running on port 8080 obviously required.
    proxy: {
      '/api': {
        target: `https://localhost:${portConfig.BACKEND_SERVER_PORT}`,
        secure: false,
      },
      '/account': {
        target: `https://localhost:${portConfig.BACKEND_SERVER_PORT}`,
        secure: false,
      },
    },
  },
  plugins: [
    // output some progress stats
    new webpack.ProgressPlugin(),

    // plugin to remove/clean your build folder
    new CleanWebpackPlugin(),

    // to auto insert <script> tag into index.html which serves the index_bundle.js
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),

    new Dotenv(),

    // create a CSS file per JS file which contains CSS
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    //   chunkFilename: '[id].css',
    // }),
  ],
};
