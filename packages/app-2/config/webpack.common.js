const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { paths, title } = require('./config');

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + '/main.ts'],
  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.tsx', '.ts', '.mjs', '.js', '.jsx', '.vue', '.json', '.wasm'],
    alias: {
      // this isn't technically needed, since the default `vue` entry for bundlers
      // is a simple `export * from '@vue/runtime-dom`. However having this
      // extra re-export somehow causes webpack to always invalidate the module
      // on the first HMR update and causes the page to reload.
      vue: 'vue/dist/vue.runtime.esm.js',
      '@': paths.src,
      assets: paths.public,
      components: paths.components,
      images: paths.images,
      styles: paths.styles,
    },
  },
  // Customize the webpack build process
  plugins: [
    // Vue plugin
    new VueLoaderPlugin(),
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),
    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title,
      favicon: paths.src + '/images/logo.png',
      template: paths.src + '/template.html', // template file
      filename: 'index.html', // output file
    }),
  ],
  // Determine how modules within the project are treated
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.ts$/, loader: 'ts-loader', options: { appendTsSuffixTo: [/\.vue$/], transpileOnly: true } },
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },
};
