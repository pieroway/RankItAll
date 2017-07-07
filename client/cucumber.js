// cucumber.js

common = '--strict --require features --format pretty --format json:results.xml --tags ~@skip';

module.exports = {
  build: common + ' --format progress',
  'default': common,
  'es5': '--tags ~@es6'
};