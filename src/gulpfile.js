/*
	Modules
*/
var gulp         = require('gulp');
var watch        = require('gulp-watch');
var prettify     = require('gulp-prettify');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var spritesmith  = require('gulp.spritesmith');

// 設定ファイルの読み込み
var config = require('./gulp-config');
var src    = config.src;
var dest   = config.dest;

/*
	Tasks
*/
// デフォルトタスクの設定 $ gulp で実行
gulp.task('default', ['sass', 'watch', 'sprite']);

// sassを監視し、更新を反映
gulp.task('watch', () => {
	gulp.watch([src.cssFiles], () => {
		gulp.start(['sass']);
	});
});

// ブラウザのシェア率定義 for 'gulp-postcss'
var browsers = [
	'> 3%'
];
// sassのコンパイル
gulp.task('sass', () => {
	return gulp.src(src.cssFiles)
	.pipe(sourcemaps.init())
	.pipe(sass({
		"outputStyle" : 'expanded'
	}).on('error', sass.logError))
	.pipe(postcss([
		require('autoprefixer')({browsers: browsers})
		]))
	.pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(dest.cssDir));
});

/**
 * css スプライト
 */
gulp.task('sprite', () => {
  var spriteData = gulp.src(src.spriteFiles) //スプライトにしたい画像
  .pipe(spritesmith({
    imgName: 'sprite.png', //スプライトの画像
    cssName: '../sass/_sprite.scss', //生成されるscss
    imgPath: '../assets/img/sprite/sprite.png', //生成されるscssに記載されるパス
    cssFormat: 'scss', //フォーマット
    cssVarMap: (sprite) => {
      sprite.name = 'sprite-' + sprite.name; //VarMap(生成されるScssにいろいろな変数の一覧を生成)
    }
  }));
  spriteData.img.pipe(gulp.dest(dest.spriteDir)); //imgNameで指定したスプライト画像の保存先
  spriteData.css.pipe(gulp.dest(src.cssDir)); //cssNameで指定したcssの保存先
});


