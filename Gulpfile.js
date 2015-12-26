var uglify = require('gulp-uglify'),
  gulp = require('gulp'),
  rename = require('gulp-rename');

gulp.task('build', function () {
  gulp.src('fecha.js')
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.extname = ".min.js"
    }))
    .pipe(gulp.dest('./'))
});
