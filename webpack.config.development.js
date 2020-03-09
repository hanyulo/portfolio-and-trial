const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
// const config = require('./config/config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: {
    app: [
      'react-hot-loader/patch',
      './src/index.js',
      'webpack-hot-middleware/client',
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/assets/profile_sketch.png',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'public/assets'),
        to: path.resolve(__dirname, 'dev-dist/assets'),
      },
    ]),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dev-dist'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      // adjust this path as needed depending on where your webpack config is
      'styled-components': path.resolve('./node_modules/styled-components'),
      react: path.resolve('./node_modules/react'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(js|jsx)$/,
        use: 'react-hot-loader/webpack',
        include: /node_modules/,
      },
    ],
  },
};

// react-hot-loader/webpack to solve react dom patch problem
// https://github.com/gaearon/react-hot-loader/issues/1227
