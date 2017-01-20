
const gulp        = require('gulp'),
    sass        = require('gulp-ruby-sass'),
    // sass        = require('gulp-sass'),
    csso        = require('gulp-csso'),
    uglify      = require('gulp-uglify'),
    pug        = require('gulp-pug'),
    concat      = require('gulp-concat'),
    browserSync = require('browser-sync'), // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
    reload      = browserSync.reload,
    tinylr      = require('tiny-lr'),
    marked      = require('marked'), // For :markdown filter in pug
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
    babel = require('gulp-babel'),
    pump = require('pump'),
    replace = require('gulp-ext-replace');
 

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
        .pipe( csso() )
        .pipe( rename('bundle.min.css') )
        .pipe( gulp.dest('dist/assets/css') )
        .pipe( browserSync.reload({
            stream: true
        }))
})

// gulp.task('rename', function() {
//     return gulp.src(['src/pug/**/*.pug', 'src/pug/components/pages/*.pug'])
//         .pipe(replace('.pug'))
//         .pipe(gulp.dest('dist/files'))
// })


gulp.task('js', function (cb) {
  pump([
        gulp.src(['src/scripts/vendor/*.js','src/scripts/local/*.js']),
        
        uglify(),
        concat('all.min.js'),
        gulp.dest('dist/assets/scripts')
    ],
    cb
  );
});

// gulp.task('fonts',['ttf2eot', 'ttf2woff'], function() {
//   return gulp.src('src/fonts/*.**')
//     .pipe( gulp.dest('dist/assets/fonts'));
// });

// gulp.task('ttf2eot', function(){
//   gulp.src(['src/fonts/*.ttf'])
//     .pipe(ttf2eot())
//     .pipe(gulp.dest('dist/assets/fonts'));
// });
// gulp.task('ttf2woff', function(){
//   gulp.src(['src/fonts/*.ttf'])
//     .pipe(ttf2woff())
//     .pipe(gulp.dest('dist/assets/fonts'));
// });

// imagemin(['src/**/*.png'], 'dist/assets/images', {use: [imageminOptipng()]}).then(() => {
//     console.log('Images optimized');
// });

gulp.task('indexTemplate', function() {
  return gulp.src('src/pug/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
});
gulp.task('templates',['indexTemplate'], function() {
  return gulp.src('src/pug/components/pages/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
    
});

gulp.task('pug-watch', ['templates'], reload);
gulp.task('styles-watch', ['styles'], reload);


gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist',
            open: false
        },
    })
})

/**
 * Serve and watch the pug files for changes
 */
gulp.task('default', ['templates',/*,'fonts',*/ 'js','styles', 'browserSync'], function() {
    
    gulp.watch('src/**/*.scss', ['styles-watch']);
    gulp.watch('src/**/*.pug', ['pug-watch']);
    gulp.watch('src/**/*.js', ['js']);
    


});


// Default Task
