var gulp        = require('gulp');
var seq         = require('run-sequence');
var del         = require('del');
var concat      = require('gulp-concat');
var htmlmin     = require('gulp-htmlmin');
var template    = require('gulp-underscore-template');
var less        = require('gulp-less');
var browserify  = require('gulp-browserify');

gulp.task('watch', function() {
    gulp.watch('./views/templates/**/*.html', ['build']);
    gulp.watch('./src/css/**/*.less', ['build']);
    gulp.watch('./src/js/**/*.js', ['build']);
});

gulp.task('templates', function() {
  return gulp.src('./views/templates/**/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        conservativeCollapse: true
    }))
    .pipe(template())
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./src/js/'))
});

gulp.task('less', function () {
  return gulp.src('./src/css/style.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('js', function() {
  return gulp.src('./src/js/*.js')
    .pipe(browserify({
      paths: ['./node_modules', './src/js/'],
      insertGlobalVars: {
        /*$: function(file, dir) {
          return 'require("jquery")';
        },*/
        _: function(file, dir) {
          return 'require("underscore")';
        },
        Backbone: function(file, dir) {
          return 'require("backbone")';
        }
      }
    }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('clean', function() {
  return del(['./dist/js/**/*', './dist/css/**/*', './dist/img/**/*']);
});

gulp.task('build', function(cb) {
  seq('clean', 'templates', 'js', 'less', cb);
});

gulp.task('default', function(cb) {
  seq('clean', 'templates', 'js', 'less', 'watch', cb);
});
