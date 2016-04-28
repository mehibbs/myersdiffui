module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: ['test/**/*.js'],
    preprocessors: {
      'src/**/*.js': ['babel'],
      'test/**/*.js': ['babel']
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      }
  });
};
