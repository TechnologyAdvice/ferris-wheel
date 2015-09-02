var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var runSequence = require('run-sequence');

gulp.task('default', 'build and watch for changes', function(cb) {
  runSequence(
    'build',
    'watch',
    cb
  );
});
