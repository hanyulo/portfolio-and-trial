const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// const config = require('./config/config');

module.exports = {
  mode: 'development',
  entry: {
    app: [
      './src/index.js',
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './public/assets/profile_sketch.png',
      template: './public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
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
    ],
  },
};
