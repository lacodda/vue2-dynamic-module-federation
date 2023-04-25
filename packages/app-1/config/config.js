const path = require('path');

module.exports = {
  paths: {
    src: path.resolve(__dirname, '../src'),
    build: path.resolve(__dirname, '../../../dist/app1'),
    public: path.resolve(__dirname, '../public'),
    components: path.resolve(__dirname, '../src/components'),
    images: path.resolve(__dirname, '../src/images'),
    styles: path.resolve(__dirname, '../src/styles'),
  },
  appId: 'app1',
  port: process.env.PORT,
  title: 'App 1',
};
