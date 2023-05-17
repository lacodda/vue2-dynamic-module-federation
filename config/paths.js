const path = require('path');

module.exports = {
  src: path.resolve('src'),
  public: path.resolve('public'),
  components: path.resolve('src/components'),
  images: path.resolve('src/images'),
  styles: path.resolve('src/styles'),
  build: path.resolve(process.env.DIST_DIR, process.env.APP_NAME),
};
