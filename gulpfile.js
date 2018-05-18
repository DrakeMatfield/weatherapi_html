'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var del = require('del');

gulp.task("concatScripts", function() {
    return gulp.src([
        'ISO_DateFormat.js',
        'Weather.js',
        'analytical.js',
        'ParserWeatherYahooApi.js',
        'JScript.js',
        'weatherApi.js'
        ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest(''));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest(''));
});

gulp.task('compileSass', function() {
  return gulp.src("scss/application.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('css'));
});

gulp.task('watchSass', function() {
  gulp.watch('scss/**/*.scss', ['compileSass']);
})

gulp.task('clean', function() {
  del(['dist', 'app*.js*']);
});

gulp.task("build", ['minifyScripts'], function() {
  return gulp.src(["StyleSheet.css", "app.min.js", 'index.html',
                   "css/fontawesome-all.min.css",
                   "favicon.ico",
                  "images/cloud.jpg",
                  "webfonts/*"
                  ], { base: './'})
            .pipe(gulp.dest('dist'));
});

gulp.task("default", ["clean"], function() {
  gulp.start("build");  
});
