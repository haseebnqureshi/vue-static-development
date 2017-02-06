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

gulp.task('assets', function() {
	return gulp.src('assets/**')
		.pipe(gulp.dest('www/assets'));
});

gulp.task('sass', function() {
	return gulp.src('styles/*.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(rename(function(path) {
			path.basename += '-temp';
		}))
		.pipe(gulp.dest('./styles'));
});

gulp.task('css', function() {
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
	gulp.watch('assets/**', [ 'assets' ]);
	gulp.watch('app/*.js', [ 'browserify' ]);
	gulp.watch('styles/*.scss', [ 'sass' ]);
	gulp.watch('styles/*.css', [ 'css' ]);
});

gulp.task('render', [ 'html', 'assets', 'browserify', 'sass', 'css' ], function() {
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

