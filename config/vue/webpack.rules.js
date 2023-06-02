module.exports = [
  { test: /\.vue$/, loader: 'vue-loader' },
  { test: /\.ts$/, loader: 'ts-loader', options: { appendTsSuffixTo: [/\.vue$/], transpileOnly: true } },
];
