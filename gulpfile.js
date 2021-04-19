const gulp = require(`gulp`);
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

function sync() {
  browserSync.init ({
    server: {
      baseDir: "./dist"
    }
  });
}

function minifyJS() {
  return gulp.src(`src/js/*.js`)
  .pipe(uglify())
  .pipe(gulp.dest(`dist/js`));
}

function minifyCSS() {
  return gulp.src(`src/css/*.css`)
  .pipe(cleanCSS())
  .pipe(gulp.dest(`dist/css`));
}

function copyHTML() {
  return gulp.src(`src/*.html`)
  .pipe(gulp.dest(`dist`));
}

function watch() {
  gulp.watch("src/css/*.css", minifyCSS).on('change', browserSync.reload);
  gulp.watch("src/js/*.js", minifyJS).on('change', browserSync.reload);
  gulp.watch("src/index.html", copyHTML).on('change', browserSync.reload);
}

exports.default = gulp.series(
  gulp.parallel(
  copyHTML, 
  minifyCSS,
  minifyJS, 
  ),
  gulp.parallel(
    sync, 
    watch
  )
);