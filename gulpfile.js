'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task("minifyScripts", function(){
gulp.src('app.js').pipe(uglify()).pipe(rename("app.min.js")).pipe(gulp.dest(""))
});

gulp.task("concatScripts", function(){
gulp.src(['JScript.js','JScriptNotifier.js']).pipe(concat("app.js")).pipe(gulp.dest(""))
});

gulp.task("hello", function(){
console.log("Hello!");
});

gulp.task("default",["hello"], function(){
console.log("This is the default task!");
});
