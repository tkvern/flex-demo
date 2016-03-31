var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var wrap = require('gulp-wrap');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('browser-sync', ['build', 'sass'], function() {
  browserSync({
    server: {
      baseDir: '..'
    }
  })
})

gulp.task('build', function() {
  gulp.src('pages/*.html')
    .pipe(wrap({
      src: 'layout/default.html'
    }))
    .pipe(gulp.dest(".."))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('image', function() {
  gulp.src('assets/*')
    .pipe(imagemin())
    .pipe(gulp.dest('../assets'))
})

gulp.task('sass', function() {
  gulp.src('styles/main.scss')
    .pipe(sass()).on('error', handleError)
    .pipe(prefix())
    .pipe(gulp.dest('../styles'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('js', function() {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('../js'));
});

gulp.task('rebuild', ['build'], function() {
  browserSync.reload();
})

gulp.task('watch', function() {
  gulp.watch(['**/*.html'], ['rebuild']);
  gulp.watch(['styles/*.scss'], ['sass']);
  gulp.watch(['js/*.js'], ['js']);
  gulp.watch(['assets/*'], ['image']);
})

gulp.task('default', ['browser-sync', 'watch']);