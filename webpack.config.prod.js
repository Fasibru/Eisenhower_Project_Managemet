const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  entry: ['@babel/polyfill', './src/client/index.tsx'],
  output: {
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
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
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

    // create a CSS file per JS file which contains CSS
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    //   chunkFilename: '[id].css',
    // }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};
