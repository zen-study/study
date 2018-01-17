/* ========================================
//
//   gulp-config.js
//    - gulpfile.jsで使用する設定
//
// ======================================== */

var SRC_ROOT  = '.';
var DEST_ROOT = '../htdocs';

module.exports = {
  src: {
    root        : SRC_ROOT,
    cssDir      : `${SRC_ROOT}/sass`,
    cssFiles    : `${SRC_ROOT}/sass/**/*.scss`,
    spriteFiles : `${SRC_ROOT}/img/_sprite/*.{png,jpeg,gif,jpg}`,
  },
  dest: {
    root        : DEST_ROOT,
    cssDir      : `${DEST_ROOT}/assets/css`,
    cssFiles    : `${DEST_ROOT}/**/*.css`,
    spriteDir   : `${DEST_ROOT}/img/_sprite-image`,
  },
  settings: {
    autoprefixer: {
      browsers: [
        'last 2 versions',
        'iOS 6',
        'Android 2.3'
      ]
    }
  }
};
