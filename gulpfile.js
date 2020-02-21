var syntax        = 'scss'; // Syntax: sass or scss;
let gulp = require('gulp'),
		sass = require('gulp-sass'),
		rename        = require('gulp-rename'),
		cleancss      = require('gulp-clean-css'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require('gulp-notify'),
		browserSync = require('browser-sync'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat');
		

sass.compiler = require('node-sass');
gulp.task('scss', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
		.pipe(sass({outputStyle: 'compressed'}).on("error", notify.onError()))
		.pipe(rename({ suffix: '.min', prefix : '' }))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleancss({ compatibility: 'ie9', format: 'uglify'})) // Opt., comment out when debugging
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream:true}))
});
gulp.task('html', function () {
	return gulp.src('app/*.html')
		.pipe(browserSync.reload({stream:true}))
});
gulp.task('script', function () {
	return gulp.src('app/*.js')
		.pipe(browserSync.reload({stream:true}))
});
gulp.task('jslibs', function() {
	return gulp.src([
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/slick-carousel/slick/slick.js',
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream:true}))
})
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app"
        },
			notify: true,
    });
});

gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
	gulp.watch('app/*.html', gulp.parallel('html'));
	gulp.watch('app/js/*.js', gulp.parallel('script'));
});
gulp.task('default', gulp.parallel('browser-sync', 'watch'));
