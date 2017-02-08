var gulp = require('gulp');
var inject = require('gulp-inject');
var print = require('gulp-print');
var clean = require('gulp-clean');
var markdown = require('gulp-markdown');
var gulpCopy = require('gulp-copy');
var watch = require('gulp-watch');


gulp.task('clean', function() {
    return gulp.src('./dist').pipe(clean())
})

gulp.task('index', ['clean'],function () {

  return gulp.src('./src/index.html')
      .pipe(inject(gulp.src('./src/*.md').pipe(markdown()), {
         starttag: '<!-- inject:md -->',
         transform: function(filepath, file) {
           return file.contents.toString();
         }
      }))
      .pipe(print(function (file) {
        return "Processing " + file;
      }))
      .pipe(inject(gulp.src('./src/*.css'), {relative: true}))
     .pipe(gulp.dest('./dist'));
});


gulp.task('copy',['clean'], function() {
    gulp.src(['./src/*.js', './src/*.css'])
   // .pipe(gulpCopy('./'))
    .pipe(gulp.dest('./dist'))
})

gulp.task('watch', function () {
    // Endless stream mode 
    gulp.watch('./src/*', ['default']);
});


gulp.task('default', ['clean', 'copy', 'index'])