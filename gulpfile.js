'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
const jasmine = require('gulp-jasmine');

gulp.task('sass', function() {
    return gulp.src('src/sass/**/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('scripts', function() {
    return gulp.src(['src/js/globals.js', 'src/js/setup.js', 'src/js/app.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('sass:watch', function() {
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('scripts:watch', function() {
    gulp.watch('src/js/*.js', ['scripts']);
});

gulp.task('jasmine', () =>
    gulp.src('spec/test.js')
    // gulp-jasmine works on filepaths so you can't have any plugins before it 
    .pipe(jasmine())
);

gulp.task('test:watch', () => {
    gulp.watch('src/js/*.js', ['jasmine']);
    gulp.watch('spec/*.js', ['jasmine']);
});
