var del = require('del');
var g = require('gulp-load-plugins')();
var gulp = require('gulp');
var runSequence = require('run-sequence');

var paths = {
  app: './app',
  build: './build'
};

gulp.task('build', function(cb) {
  runSequence(
    'clean-build',
    [
      'build-assets',
      'build-html',
      'build-less',
      'build-js'
    ],
    cb
  );
});

gulp.task('clean-build', function(cb) {
  del(paths.build, cb)
});

gulp.task('build-js', function() {
  var jsPrettifyOps = {
    indent_size: 2,
    max_preserve_newlines: 2,
    wrap_attributes_indent_size: 2
  };

  return gulp.src([
    paths.app + '/**/*-module.js',
    paths.app + '/**/*-constant.js',
    paths.app + '/**/*-provider.js',
    paths.app + '/**/*-value.js',
    paths.app + '/**/*-service.js',
    paths.app + '/**/*-factory.js',
    paths.app + '/**/*-directive.js',
    paths.app + '/**/*-controller.js',
    paths.app + '/app.js'
  ])
    .pipe(g.plumber())
    .pipe(g.ngAnnotate())
    .pipe(g.concat('app.js'))
    .pipe(g.iife())
    .pipe(g.jsPrettify(jsPrettifyOps))
    .pipe(gulp.dest(paths.build))
    .pipe(g.uglify())
    .pipe(g.rename('app.min.js'))
    .pipe(gulp.dest(paths.build));
});

gulp.task('build-assets', function() {
  return gulp.src([
    paths.app + '/assets/**/*'
  ])
    .pipe(gulp.dest(paths.build + '/assets'));
});

gulp.task('build-html', function() {
  return gulp.src([
    paths.app + '/**/*.html'
  ])
    .pipe(gulp.dest(paths.build));
});

gulp.task('build-less', function(cb) {
  return gulp.src([
    paths.app + '/components/**/*.less',
    paths.app + '/views/**/*.less'
  ])
    .pipe(g.plumber())
    .pipe(g.less())
    .pipe(g.minifyCss())
    .pipe(g.rename('app.css'))
    .pipe(gulp.dest(paths.build))
    .pipe(g.rename('app.min.css'))
    .pipe(gulp.dest(paths.build));
});

gulp.task('watch', function(cb) {
  gulp.watch([paths.app + '/assets/**/*'], ['build-assets']);
  gulp.watch([paths.app + '/**/*.less'], ['build-less']);
  gulp.watch([paths.app + '/**/*.js'], ['build-js']);
  gulp.watch([paths.app + '/**/*.html'], ['build-html']);
  cb();
});

gulp.task('default', function(cb) {
  runSequence(
    'build',
    'watch',
    cb
  );
});
