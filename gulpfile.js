
/*==============
general deps
===============*/

var exec = require('child_process').execSync;


/*==============
gulp custom tasks
===============*/

var gulp = require('gulp');
var pug = require('gulp-pug');

gulp.task('html', function() {
	return gulp.src('templates/*.pug')
		.pipe(pug())
		.pipe(gulp.dest('www'));
});

gulp.task('browserify', function() {
	exec('browserify app/main.js -o www/bundle.js');
});


/*==============
gulp core tasks
===============*/

gulp.task('watch', function() {
	gulp.watch('templates/*.pug', [ 'html' ]);
	gulp.watch('app/*.js', [ 'browserify' ]);
});

gulp.task('render', [ 'html', 'browserify' ]);

gulp.task('default', [ 'render', 'watch' ]);


/*==============
dev server
===============*/

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/www'));

app.listen(8080, function() {
	exec('open http://localhost:8080');
});

