var del = require('del');
var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var runSequence = require('run-sequence');

var config = require('../../config');

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
  del(config.paths.build, cb)
});

gulp.task('build-js', function() {
  var jsPrettifyOps = {
    indent_size: 2,
    max_preserve_newlines: 2,
    wrap_attributes_indent_size: 2
  };

  return gulp.src([
    config.paths.app + '/**/*-module.js',
    config.paths.app + '/**/*-constant.js',
    config.paths.app + '/**/*-provider.js',
    config.paths.app + '/**/*-value.js',
    config.paths.app + '/**/*-service.js',
    config.paths.app + '/**/*-factory.js',
    config.paths.app + '/**/*-directive.js',
    config.paths.app + '/**/*-controller.js',
    config.paths.app + '/app.js'
  ])
    .pipe(g.plumber())
    .pipe(g.ngAnnotate())
    .pipe(g.concat('app.js'))
    .pipe(g.iife())
    .pipe(g.jsPrettify(jsPrettifyOps))
    .pipe(gulp.dest(config.paths.build))
    .pipe(g.uglify())
    .pipe(g.rename('app.min.js'))
    .pipe(gulp.dest(config.paths.build));
});

gulp.task('build-assets', function() {
  return gulp.src([
    config.paths.app + '/assets/**/*'
  ])
    .pipe(gulp.dest(config.paths.build + '/assets'));
});

gulp.task('build-html', function() {
  var minifyOpts = {
    empty: false,         // keep empty attributes
    cdata: false,         // keep script CDATA
    comments: false,      // keep comments
    conditionals: false,  // keep conditional internet explorer comments
    spare: false,         // keep redundant attributes
    quotes: false,        // keep arbitrary quotes
    loose: false          // preserve one whitespace
  };

  var replaceOpts = {
    keepUnassigned: true    // keep build blocks without a defined replacement
  };

  var replaceTasks = {};
  replaceTasks[config.env.inProduction ? 'development' : 'production'] = '';

  return gulp.src([
    config.paths.app + '/**/*.html'
  ])
    .pipe(g.htmlReplace(replaceTasks, replaceOpts))
    .pipe(g.if(config.env.inProduction, g.minifyHtml(minifyOpts)))
    .pipe(gulp.dest(config.paths.build));
});

gulp.task('build-less', function(cb) {
  return gulp.src([
    config.paths.app + '/less/**/*.less',
    config.paths.app + '/components/**/*.less',
    config.paths.app + '/views/**/*.less'
  ])
    .pipe(g.plumber())
    .pipe(g.less())
    .pipe(g.autoprefixer())
    .pipe(g.concat('app.css'))
    .pipe(gulp.dest(config.paths.build))
    .pipe(g.minifyCss())
    .pipe(g.rename('app.min.css'))
    .pipe(gulp.dest(config.paths.build));
});
