/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var addone = __webpack_require__(1);
document.getElementById('zanBtn').onclick=function(){
    addone(this);
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*global $*/
module.exports = function(node, options = {}) {
    const obj = $(node);
    options = $.extend({
        obj: obj || null, // jq对象，要在那个html标签上显示
        str: '+1', // 字符串，要显示的内容;也可以传一段html，如: "<b style='font-family:Microsoft YaHei;'>+1</b>"
        startSize: '12px', // 动画开始的文字大小
        endSize: '20px', // 动画结束的文字大小
        interval: 600, // 动画时间间隔
        color: '#EE0000', // 文字颜色
        weight: 'bold', // 文字
        callback: function() {} // 回调函数
    }, options);
    $('body').append(`<span class='num'>${options.str}</span>`);
    const box = $('.num');
    let left = options.obj.offset().left + options.obj.width() / 2;
    let top = options.obj.offset().top - options.obj.height();
    box.css({
        'position': 'absolute',
        'left': left + 10 + 'px',
        'top': top - 10 + 'px',
        'z-index': 9999,
        'font-size': options.startSize,
        'line-height': options.endSize,
        'color': options.color,
        'font-weight': options.weight
    });
    box.animate({
        'font-size': options.endSize,
        'opacity': '0',
        'top': top - parseInt(options.endSize) + 'px'
    }, options.interval, () => {
        box.remove();
        options.callback();
    });
};


/***/ })
/******/ ]);