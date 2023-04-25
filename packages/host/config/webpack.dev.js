const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { ModuleFederationPlugin } = require('webpack').container;
const dependencies = require('../package.json').dependencies;
const common = require('./webpack.common');
const { port, appId } = require('./config');

function getShared () {
  const shared = {};
  for (const key in dependencies) {
    shared[key] = {
      eager: true,
      singleton: true,
      requiredVersion: dependencies[key],
    };
  }
  return shared;
}

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',
  // Control how source maps are generated
  devtool: 'inline-source-map',
  cache: false,
  optimization: {
    minimize: false,
  },
  target: 'web',
  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port,
    static: './',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(sass|scss|css)$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1, modules: false } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
    new ModuleFederationPlugin({
      name: appId,
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {},
      shared: getShared(),
    }),
  ],
});