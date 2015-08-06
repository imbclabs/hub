var gulp = require('gulp');
var stripDebug = require('gulp-strip-debug');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var ugligy = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

var src = 'src';
var dist = 'dist';

var paths = {
	js : 'js/*.js',
	scss : 'scss/jammybook.scss',
	html : src + '/**/*.html'
};

gulp.task('bower:copy', function() {
	return gulp.src('bower_components/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('js'));
});
gulp.task('images', function() {
	return gulp.src('./img/**')
		.pipe(gulp.dest('./img'));
});
gulp.task('compile-sass', function() {
	return gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest('css'));
});
gulp.task('scripts', function() {
	return gulp.src(paths.js)
		.pipe(stripDebug())
		.pipe(gulp.dest(dist+'/js'));
});
gulp.task('watch', ['clean'], function() {
	gulp.watch(paths.scss, ['compile-sass']);
	gulp.watch(paths.js, ['scripts']);
});

gulp.task('default',[
	'compile-sass','scripts','bower:copy'
]);