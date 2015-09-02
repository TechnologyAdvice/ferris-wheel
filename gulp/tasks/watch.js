var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var CONFIG = require('../../config');

gulp.task('watch', 'watch for changes and rebuild', function(cb) {
  gulp.watch([CONFIG.paths.app + '/assets/**/*'], ['build-assets']);
  gulp.watch([CONFIG.paths.app + '/**/*.less'], ['build-less']);
  gulp.watch([CONFIG.paths.app + '/**/*.js'], ['build-js']);
  gulp.watch([CONFIG.paths.app + '/**/*.html'], ['build-html']);
  cb();
});
