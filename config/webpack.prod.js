require('dotenv').config({ path: '.env.production' });
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: 'styles/[name].[contenthash].css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});