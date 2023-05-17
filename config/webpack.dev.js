require('dotenv').config({ path: '.env.development' });
const { HotModuleReplacementPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

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
    compress: true,
    hot: true,
    port: process.env.APP_PORT,
    static: './',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    onListening: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      // eslint-disable-next-line no-console
      console.log(`APP_LISTENING|${process.env.APP_NAME}|${process.env.APP_HOST}|${process.env.APP_PORT}`);
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
    new HotModuleReplacementPlugin(),
  ],
});
