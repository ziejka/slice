'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('sass', function() {
    return gulp.src('src/sass/**/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function() {
    return gulp.src(['src/js/globals.js', 'src/js/setup.js', 'src/js/stage.js', 
        'src/js/enemy.js','src/js/player.js','src/js/app.js'])
    // return gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('jasmine-concat', () => {
    return gulp.src('spec/*js')
        .pipe(concat('tests.js'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('sass:watch', function() {
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('src:watch', function() {
    gulp.watch('src/js/*.js', ['scripts']);
});

gulp.task('test:watch', () => {
    gulp.watch('spec/*.js', ['jasmine-concat']);
});

gulp.task('watch', () => {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('spec/*.js', ['jasmine-concat']);
});
