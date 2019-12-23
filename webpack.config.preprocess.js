const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: {
    authorization: './src/express/middlewares/authorization.js',
    serverRenderer: './src/express/middlewares/serverRenderer.js',
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/assets/profile_sketch.png',
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'public/assets'),
        to: path.resolve(__dirname, 'dev-dist/assets'),
      },
    ]),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dev-dist'),
    libraryTarget: 'commonjs2',
  },
  target: 'node',
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
