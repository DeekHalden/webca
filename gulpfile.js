
const gulp        = require('gulp'),
    sass        = require('gulp-ruby-sass'),
    csso        = require('gulp-csso'),
    uglify      = require('gulp-uglify'),
    jade        = require('gulp-jade'),
    concat      = require('gulp-concat'),
    browserSync = require('browser-sync'), // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
    reload      = browserSync.reload,
    tinylr      = require('tiny-lr'),
    marked      = require('marked'), // For :markdown filter in jade
    path        = require('path'),
    server      = tinylr(),
    rename      = require('gulp-rename'),
    imagemin = require('imagemin'),
    imageminOptipng = require('imagemin-optipng'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps');
    ttf2eot = require('gulp-ttf2eot'),
    ttf2woff = require('gulp-ttf2woff'),
    combineMq = require('gulp-combine-mq'),
    babel = require('gulp-babel');
 
gulp.task('default', () => {
    return gulp.src('src/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});


// --- Basic Tasks ---
gulp.task('styles', () => {
    sass('src/styles/styles.scss')
        .on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(combineMq({
            beautify: false
        }))
        // .pipe( csso() )
        // .pipe( sourcemaps.write('.') )
        .pipe( rename('bundle.min.css') )
        .pipe( gulp.dest('dist/assets/css') )
        .pipe( browserSync.reload({
            stream: true
        }))
})


gulp.task('js', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(sourcemaps.init())
    // .pipe(babel({
    //     presets: ['es2015']
    // }))
    // .pipe( uglify() )
    .pipe( concat('all.min.js') )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('dist/assets/scripts/') )
   
});

gulp.task('fonts',['ttf2eot', 'ttf2woff'], function() {
  return gulp.src('src/fonts/*.**')
    .pipe( gulp.dest('dist/assets/fonts'));
});

gulp.task('ttf2eot', function(){
  gulp.src(['src/fonts/*.ttf'])
    .pipe(ttf2eot())
    .pipe(gulp.dest('dist/assets/fonts'));
});
gulp.task('ttf2woff', function(){
  gulp.src(['src/fonts/*.ttf'])
    .pipe(ttf2woff())
    .pipe(gulp.dest('dist/assets/fonts'));
});

// gulp.task('scripts', function() {
//   return gulp.src('src/scripts/*.js')
//     // .pipe( uglify() )
//     .pipe( gulp.dest('dist/assets/scripts'));
// });

gulp.task('images', function() {
  return gulp.src('src/**/*.png')
   
    .pipe(rename({dirname:''}))
    .pipe( gulp.dest('dist/assets/images'));
})

// imagemin(['src/**/*.png'], 'dist/assets/images', {use: [imageminOptipng()]}).then(() => {
//     console.log('Images optimized');
// });

gulp.task('templates', function() {
  return gulp.src('src/jade/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
    
});

gulp.task('jade-watch', ['templates'], reload);
gulp.task('styles-watch', ['styles'], reload);


gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
})

/**
 * Serve and watch the jade files for changes
 */
gulp.task('default', ['fonts', 'js','styles', 'browserSync','images'], function() {
    
    gulp.watch('src/**/*.scss', ['styles-watch']);
    gulp.watch('src/**/*.jade', ['jade-watch']);
    gulp.watch('src/**/*.js', ['js']);
    


});


// Default Task
