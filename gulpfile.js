var gulp = require('gulp');
var critical = require('critical');
var typescript = require('gulp-typescript');
var browserify = require('browserify');
var babelify = require('babelify');
var plugins = require('gulp-load-plugins');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');

var tsProject = typescript.createProject('tsconfig.json');

/* ----------------- */
/* Convert all typescript to javascript
/* ----------------- */
gulp.task('typescript', function() {
  return gulp
    .src('./src/**/*.ts')
    .pipe(tsProject())
    .pipe(gulp.dest('./src'));
});

/* ----------------- */
/* Development Scripts
/* Bundle up the client scripts and inject
/* ----------------- */
gulp.task('clientScripts', function() {
  return browserify({
    entries: ['./src/client/scripts/index.js']
    // debug: true,
    // transform: [
    //   babelify.configure({
    //     presets: ["env"]
    //   })
    // ]
  })
    .bundle()
    .on('error', function() {
      var args = Array.prototype.slice.call(arguments);

      plugins()
        .notify.onError({
          title: 'Compile Error',
          message: '<%= error.message %>'
        })
        .apply(this, args);

      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(
      plugins().sourcemaps.init({
        loadMaps: true
      })
    )
    .pipe(plugins().sourcemaps.write('.'))
    .pipe(gulp.dest('./build/js/'))
    .pipe(browserSync.stream());
});

/* ----------------- */
/* Images
/* Send images to dist folder
/* ----------------- */
gulp.task('images', function() {
  return gulp
    .src('./src/client/images/**/*')
    .pipe(gulp.dest('./build/images/'))
    .pipe(browserSync.stream());
});

/* ----------------- */
/* Development CSS
/* Convert Scss to css and move to dist
/* ----------------- */
gulp.task('clientStyles', function() {
  return gulp
    .src('./src/client/scss/**/*.scss')
    .pipe(plugins().sourcemaps.init())
    .pipe(
      plugins()
        .sass()
        .on('error', plugins().sass.logError)
    )
    .pipe(plugins().sourcemaps.write())
    .pipe(gulp.dest('./build/css/'))
    .pipe(browserSync.stream());
});

/* ----------------- */
/* Removes build folder.
/* ----------------- */
gulp.task('cleanBuild', function() {
  return gulp.src('build', { read: false }).pipe(clean());
});

/* ----------------- */
/* HTML to build folder
/* ----------------- */
gulp.task('html', function() {
  return gulp.src('index.html').pipe(gulp.dest('./build'));
});

/* ----------------- */
/* Production CSS
/* ----------------- */
gulp.task('cssmin', function() {
  return gulp
    .src('./src/client/scss/**/*.scss')
    .pipe(
      plugins()
        .sass({
          outputStyle: 'compressed'
        })
        .on('error', plugins().sass.logError)
    )
    .pipe(gulp.dest('./build/css/'));
});

/* ----------------- */
/* Production JS
/* ----------------- */
gulp.task('jsmin', function() {
  return browserify({
    entries: ['./src/client/scripts/index.js'],
    debug: false,
    transform: [
      babelify.configure({
        presets: ['env']
      })
    ]
  })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(plugins().uglify())
    .pipe(gulp.dest('./build/js/'));
});

/* ----------------- */
/* Production Task
/* ----------------- */
gulp.task('deploy', function(callback) {
  runSequence('cleanBuild', 'typescript', ['html', 'jsmin', 'cssmin']);
});

/* ----------------- */
/* Development Task
/* ----------------- */
gulp.task('develop', function(callback) {
  runSequence(
    'cleanBuild',
    'typescript',
    ['clientScripts', 'clientStyles', 'images'],
    function() {
      browserSync({
        server: './',
        snippetOptions: {
          rule: {
            match: /<\/body>/i,
            fn: snippet => snippet
          }
        }
      });

      gulp.watch('./src/**/*.ts', ['typescript']);
      gulp.watch('./src/**/*.js', ['clientScripts']);
      gulp.watch('./src/client/scss/**/*.scss', ['clientStyles']);
      gulp.watch('./*.html', browserSync.reload);
    }
  );
});

gulp.task('default', ['development']);
