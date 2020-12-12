const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval',
  entry: path.resolve(__dirname, 'src/index'),
  output: {
    publicPath: 'build',
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new WriteFilePlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/static'),
        to: path.resolve(__dirname, 'build/static'),
        toType: 'dir',
      },
    ]),
  ],
  devServer: {
    contentBase: 'build/',
    compress: true,
    port: 3000,
    inline: true,
    publicPath: 'static/',
    index: '200.html',
    historyApiFallback: {
      index: '200.html',
    },
  },
};