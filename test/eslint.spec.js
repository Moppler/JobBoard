const lint = require('mocha-eslint');

const paths = ['src/**/*.js', 'test/**/*.spec.js'];
const options = {
  strict: true,
};

lint(paths, options);
