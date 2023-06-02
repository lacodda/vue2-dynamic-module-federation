const { createWebpackAliases } = require('./webpack.helpers');

/**
 * Export Webpack Aliases
 *
 * Tip: Some text editors will show the errors or invalid intellisense reports
 * based on these webpack aliases, make sure to update `tsconfig.json` file also
 * to match the `paths` we using in here for aliases in project.
 */
module.exports = createWebpackAliases({
  '@': 'src',
  src: 'src',
  components: 'src/components',
  images: 'src/images',
  styles: 'src/styles',
  public: 'public',
  build: 'dist',
  main: 'src/main.ts',
});
