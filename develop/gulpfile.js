const { src, dest, watch, series, parallel, lastRun }  = require("gulp");
const gulp = require('gulp');
// const del = require('del');
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require('gulp-sass-glob');
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssdeclsort = require("css-declaration-sorter");
const gcmq = require("gulp-group-css-media-queries");
const rename = require("gulp-rename");
const cleanCss = require("gulp-clean-css");
const uglify = require("gulp-uglify");

// 入出力するフォルダのパス
const devRoot = './assets';

// 開発フォルダのパス
const devPath = {
  'scss': devRoot + '/scss/**/*.scss',
  'img': devRoot + '/img/**/*',
  'js': devRoot + '/js/**/*.js',
};

const scssPath = {
  'base': devRoot + '/scss/base.scss',
  'common': devRoot + '/scss/common.scss',
  'snippets': devRoot + '/scss/snippets/*.scss',
  'sections': devRoot + '/scss/sections/*.scss',
  'templates': devRoot + '/scss/templates/*.scss',
}

const assetsPath = '../assets/';

/**
 * compile sass
 * sassファイルのコンパイルとsourcemapの作成
 */
const compileSass = done => {
  const postcssPlugins = [
    autoprefixer({
      grid: "autoplace",
      cascade: false,
    }),
    cssdeclsort({ order: "alphabetical" })
  ];
  src(
    [
      scssPath.base,
      scssPath.common,
      scssPath.snippets,
      scssPath.sections,
      scssPath.templates,
    ],
    { sourcemaps: false }
  )
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(postcss(postcssPlugins))
    .pipe(gcmq())
    // .pipe(cleanCss())
    .pipe(rename(function(path) {
      path.dirname = path.dirname.replace('assets/**/', 'assets/');
    }))
    .pipe(dest(assetsPath));
  done();
};

/**
 * clean
 * distフォルダ内のファイルをクリア
 */
// const cleanAssets = () => {
//   return del(distPath.assets + "**/*");
// }

/**
 * copy
 * devからdistへファイルをコピー
 */
const img = () => {
  return gulp.src(devPath.img)
  .pipe(gulp.dest(assetsPath));
}

const js = () => {
  return gulp.src(devPath.js)
  // .pipe(uglify())
  .pipe(gulp.dest(assetsPath));
}

/**
 * update
 * dist内のファイルを更新
 */
gulp.task("updateFiles", (done) => {
  // del(distPath.assets + "**/*");
  gulp.src(devPath.img)
    .pipe(gulp.dest(assetsPath));
  gulp.src(devPath.js)
    // .pipe(uglify())
    .pipe(gulp.dest(assetsPath));
  done();
});

/**
 * watch
 * ファイルの追加・変更を監視
 */
const watchFiles = () => {
  watch(devPath.scss, series(compileSass))
  watch(devPath.img, series(img))
  watch(devPath.js, series(js))
};

/**
 * execution
 */
module.exports = {
  sass: compileSass,
  build: series(gulp.task('updateFiles'), parallel(compileSass)),
  default: series(gulp.task('updateFiles'), parallel(compileSass), watchFiles)
};