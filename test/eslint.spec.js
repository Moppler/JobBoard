const lint = require('mocha-eslint');

const paths = ['src/**/*.js'];
const options = {
  strict: true,
};

lint(paths, options);
