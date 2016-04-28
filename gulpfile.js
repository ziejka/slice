const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

gulp.task('default', ['watch'], () => {

});

gulp.task('es6', () =>
    gulp.src('src/js/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/js'))
);

gulp.task('sass', () =>
    gulp.src('src/sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
);

gulp.task('watch', () => {
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['es6']);
});
