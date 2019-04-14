const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js',
  },
  module: {
    rules: [
      {
        // pass all js files except for those in the node_modules folder through babel-loader to transform JSX to Javascript
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // pass all css files through style-loader (injects <style> tag in DOM) and css-loader
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    port: 3000,
    // proxy /api requests to http://localhost:8080/api during dev phase --> backend server running on port 8080 obviously required.
    proxy: {
      '/api': 'http://localhost:8080',
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
  ],
};
