const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  entry: ['@babel/polyfill', './src/client/index.js'],
  output: {
    // publicPath: path.join(__dirname, '/dist'),
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js',
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
    // publicPath: '/',
    historyApiFallback: true,
    port: 3000,
    // proxy /api requests to http://localhost:8080/api during dev phase --> backend server running on port 8080 obviously required.
    proxy: {
      '/api': 'http://localhost:8080',
      '/': 'http://localhost:8080',
      changeOrigin: true,
    },
  },
  plugins: [
    // output some progress stats
    new webpack.ProgressPlugin(),

    // plugin to remove/clean your build folder
    new CleanWebpackPlugin(),

    // to auto insert <script> tag into index.html which serves the index_bundle.js
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),

    new Dotenv(),

    // create a CSS file per JS file which contains CSS
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    //   chunkFilename: '[id].css',
    // }),
  ],
};
