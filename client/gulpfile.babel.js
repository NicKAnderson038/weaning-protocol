import gulp from 'gulp'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import uglify from 'gulp-uglify'
import concatCss from "gulp-concat-css"
import cleanCSS from 'gulp-clean-css'
import sourcemaps from 'gulp-sourcemaps'
import htmlmin from 'gulp-htmlmin'
import imagemin from 'gulp-imagemin'

const gulpTasks = [
  'transpile',
  'minify-concat-css',
  'indexHTML',
  'minifyHTML',
  'minifyIcon',
  'fonts'
]

const css = [
    "src/css/angular-toastr.css",
    "src/css/bootstrap.css",
    "src/css/font-awesome.min.css",
    "src/css/hoverex-all.css",
    "src/css/prettyPhoto.css",
    "src/css/style.css",
]

gulp.task("default", gulpTasks)

gulp.task("transpile", () => {

  return browserify("src/app.module.js")
    .transform("babelify")
    .bundle()
    .on("error", function (error) {
      console.error("\nError: ", error.message, "\n")
      this.emit("end")
    })
    .pipe(source("bundle.js"))
    .pipe(buffer())
    // .pipe(uglify({
    //   mangle:false
    // }))
    .pipe(gulp.dest("dist"))

})

gulp.task('minify-concat-css', () => {
  return gulp.src(css)
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(concatCss('css.min.css'))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
})

gulp.task('indexHTML', () => {
    return gulp.src(['index.html'])
      .pipe(htmlmin({
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        removeComments: true
      }))
      .pipe(gulp.dest('dist'))
})

gulp.task('minifyHTML', () => {
    return gulp.src(['views/*.html'])
      .pipe(htmlmin({
        ignoreCustomFragments:[ /<|>/ ],
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        removeComments: true
        
      }))
      .pipe(gulp.dest('dist/views'))
})

gulp.task('minifyIcon', () => {
    return gulp.src(['src/img/Medical-Sign-icon.png'])
      .pipe(imagemin({
        optimizationLevel: 3,
        progressive:true,
        interlaced: true
      }))
      .pipe(gulp.dest('dist/img'))
})

gulp.task('fonts', function (){
  return gulp.src([
    'src/fonts/*'
  ])
  .pipe(gulp.dest('dist/fonts'))
})

gulp.task("watch", ["transpile"], () => {
  gulp.watch("src/**/*", ["transpile"]);
});