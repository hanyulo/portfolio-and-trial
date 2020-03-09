const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');


// plugins: [
//   new CleanWebpackPlugin(),
//   new HtmlWebpackPlugin({
//     favicon: './public/assets/profile_sketch.png',
//     template: './public/index.html',
//     filename: 'template.html',
//   }),
//   new CopyPlugin([
//     {
//       from: path.resolve(__dirname, 'public/assets'),
//       to: path.resolve(__dirname, 'dist/assets'),
//     },
//   ]),
// ],

module.exports = {
  mode: 'production',
  entry: {
    server: './server.js',
  },
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  target: 'node',
  resolve: {
    alias: {
      // adjust this path as needed depending on where your webpack config is
      'styled-components': path.resolve('./node_modules/styled-components'),
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
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
    ],
  },
};
