'use strict';


/*==============
general deps
===============*/

var exec = require('child_process').execSync;


/*==============
gulp custom tasks
===============*/

var browserify = require('browserify');
var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var cleanCss = require('gulp-clean-css');
var source = require('vinyl-source-stream');

gulp.task('html', function() {
	return gulp.src('templates/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('www'));
});

gulp.task('styles', function() {

	gulp.src('styles/*.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(rename(function(path) {
			path.basename += '-temp';
		}))
		.pipe(gulp.dest('./styles'));

	return gulp.src('styles/*.css')
		.pipe(concatCss('bundle.css'))
		.pipe(cleanCss({ compatibility: 'ie8' }))
		.pipe(gulp.dest('www'));
});

gulp.task('browserify', function() {
	return browserify('app/main.js')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('www'));
});


/*==============
gulp core tasks
===============*/

gulp.task('watch', function() {
	gulp.watch('templates/*.pug', [ 'html' ]);
	gulp.watch('app/*.js', [ 'browserify' ]);
	gulp.watch('styles/*.s?css', [ 'styles' ]);
});

gulp.task('render', [ 'html', 'browserify', 'styles' ], function() {
	exec('open http://localhost:8080');
});

gulp.task('default', [ 'render', 'watch' ]);


/*==============
dev server
===============*/

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/www'));

app.listen(8080);

