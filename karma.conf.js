module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['browserify', 'mocha'],
    files: ['test/**/*.js'],
	browserify: {
      debug: true,
      transform: [
        ['babelify']
      ]
    },
    preprocessors: {
      'test/**/*.js': ['browserify']
    }
  });
};
