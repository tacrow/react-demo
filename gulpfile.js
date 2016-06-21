'use strict';

var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	del = require('del'),
	sass = require('gulp-ruby-sass'),
	runSequence = require('run-sequence');

// build環境のnodeバージョンがv0.10系のため、cssnanoエラーを回避する対応
// @see https://github.com/ben-eb/gulp-cssnano/issues/40
// require('es6-promise').polyfill();

var cssnano = [
	require('cssnano')({ mergeRules: false })
];

var src = {
	scss:     'src/scss/**/*.scss',
	css:      'src/css/*.css',
	dest_css: 'src/css/',
	js:       'src/js/*.js',
	dest_js:  'src/js/',
}

gulp.task('clean', function(cb) {
	return del([src.css], cb);
});

// scss task
gulp.task('sass', function() {
	return sass(src.scss, { noCache: true, style: 'expanded' })
	.pipe($.plumber())
	.pipe($.autoprefixer())
	.pipe(gulp.dest(src.dest_css));
});

// css task
gulp.task('postcss-cssnano', function() {
	return gulp.src(src.css)
	.pipe($.plumber())
	.pipe($.postcss(cssnano))
	.pipe(gulp.dest(src.dest_css));
});

// js task
gulp.task('jshint', function() {
	return gulp.src(src.js)
	.pipe($.plumber())
	.pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});
gulp.task('uglify', function() {
	return gulp.src(src.js)
	.pipe($.plumber())
	.pipe($.uglify({ preserveComments: 'some' }))
	.pipe(gulp.dest(src.dest_js));
});

// watch
gulp.task('watch', function() {
	gulp.watch(src.scss, ['sass']);
	gulp.watch(src.js, ['jshint']);
});

//build
gulp.task('build', function(cb) {
	runSequence('clean', 'sass', 'postcss-cssnano', 'uglify', cb);
});

// default
gulp.task('default', ['watch']);
