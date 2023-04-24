# 📦A Vue.js 2 boilerplate (Webpack, Babel, Typescript, SCSS, PostCSS)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Installation

Clone this repo and npm install.

```bash
npm i
```

## Usage

### Development server

```bash
npm start
```

You can view the development server at `localhost:8080`

### Production build

```bash
npm run build
```

You can view the deploy by creating a server in `dist`

```bash
npm run serve
```

## Features

- [vue.js](https://vuejs.org/)
- [webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [Typescript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- [PostCSS](https://postcss.org/)

## Dependencies

### Vue.js

- [`vue`](https://www.npmjs.com/package/vue) - A framework for making user interfaces
- [`vue-router`](https://www.npmjs.com/package/vue-router) - Routing in Vue

### Webpack

- [`webpack`](https://github.com/webpack/webpack) - Module and asset bundler.
- [`webpack-cli`](https://github.com/webpack/webpack-cli) - Command line interface for webpack
- [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) - Development server for webpack
- [`webpack-merge`](https://github.com/survivejs/webpack-merge) - Simplify development/production configuration
- [`cross-env`](https://github.com/kentcdodds/cross-env) - Cross platform configuration

### Babel

- [`@babel/core`](https://www.npmjs.com/package/@babel/core) - Transpile ES6+ to backwards compatible JavaScript
- [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env) - Smart defaults for Babel
- [`@babel/plugin-transform-runtime`](https://babeljs.io/docs/en/babel-plugin-transform-runtime) - Babel to use async/await
- [`@babel/plugin-proposal-object-rest-spread`](https://babeljs.io/docs/en/plugin-proposal-object-rest-spread) - Babel helper
- [`@babel/plugin-transform-arrow-functions`](https://babeljs.io/docs/en/plugin-transform-arrow-functions) - For arrow functions
- [`@babel/plugin-transform-async-to-generator`](https://babeljs.io/docs/en/plugin-transform-async-to-generator) - Generator for async/await
- [`@babel/plugin-proposal-class-properties`](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) - Use properties on a class

### Typescript

- [`typescript`](https://www.npmjs.com/package/typescript) - TypeScript is a language for application-scale JavaScript

### Loaders

- [`babel-loader`](https://webpack.js.org/loaders/babel-loader/) - Transpile files with Babel and webpack
- [`sass-loader`](https://webpack.js.org/loaders/sass-loader/) - Load SCSS and compile to CSS
  - [`sass`](https://www.npmjs.com/package/sass) - Node Sass
- [`postcss-loader`](https://webpack.js.org/loaders/postcss-loader/) - Process CSS with PostCSS
  - [`postcss-preset-env`](https://www.npmjs.com/package/postcss-preset-env) - Sensible defaults for PostCSS
- [`css-loader`](https://webpack.js.org/loaders/css-loader/) - Resolve CSS imports
- [`style-loader`](https://webpack.js.org/loaders/style-loader/) - Inject CSS into the DOM
- [`vue-loader`](https://www.npmjs.com/package/vue-loader) - webpack loader for Vue Single-File Components
- [`vue-style-loader`](https://www.npmjs.com/package/vue-style-loader) - Load styles into the DOM
- [`vue-template-compiler`](https://www.npmjs.com/package/vue-template-compiler) - Pre compilation of Vue 2.0 templates into render functions
- [`ts-loader`](https://www.npmjs.com/package/ts-loader) - TypeScript loader for webpack

### Plugins

- [`clean-webpack-plugin`](https://github.com/johnagan/clean-webpack-plugin) - Remove/clean build folders
- [`copy-webpack-plugin`](https://github.com/webpack-contrib/copy-webpack-plugin) - Copy files to build directory
- [`html-webpack-plugin`](https://github.com/jantimon/html-webpack-plugin) - Generate HTML files from template
- [`mini-css-extract-plugin`](https://github.com/webpack-contrib/mini-css-extract-plugin) - Extract CSS into separate files
- [`css-minimizer-webpack-plugin`](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/) - Optimize and minimize CSS assets

### Linters

- [`eslint`](https://github.com/eslint/eslint) - Enforce styleguide across application
- [`eslint-import-resolver-webpack`](https://github.com/benmosher/eslint-plugin-import/tree/master/resolvers/webpack) - Throw exceptions for import/export in webpack
- [`eslint-config-standard-with-typescript`](https://www.npmjs.com/package/eslint-config-standard-with-typescript) - An ESLint shareable config for TypeScript that is based on eslint-config-standard and has TypeScript specific rules from @typescript-eslint/eslint-plugin

### Other

- [`serve`](https://www.npmjs.com/package/serve) - Static file serving and directory listing

## Author

- [Kirill Lahtachev](https://lacodda.com)

## License

This project is open source and available under the [MIT License](LICENSE).
