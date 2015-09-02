var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var runSequence = require('run-sequence');

var config = require('../../config');

gulp.task('heroku:production', function(cb) {
  runSequence(
    'build',
    cb
  );
});
