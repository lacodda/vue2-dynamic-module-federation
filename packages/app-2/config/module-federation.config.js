const { ModuleFederationPlugin } = require('webpack').container;
const dependencies = require('../package.json').dependencies;
const { appId } = require('./config');

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

module.exports = new ModuleFederationPlugin({
  name: appId,
  filename: 'remoteEntry.js',
  exposes: {
    './Module': './src/components/App',
  },
  shared: getShared(),
});
