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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "http://images.client.vip.xunlei.com/newvip/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var tipsObj = {
	data: {
		setting: {
			text: "",
			delay: 2000,
			callback: function callback() {}
		},
		timeoutID: 0
	},
	show: function show(obj) {
		$.extend(this.data.setting, obj);
		clearTimeout(this.data.timeoutID);
		$("#tips").stop().remove();
		var tpl = this.tpl();
		$("body").append(tpl);
		this.css();
		this.alignCenter();
		this.hide();
	},
	hide: function hide() {
		var _this = this;
		this.data.timeoutID = setTimeout(function () {
			$("#tips").fadeOut("1000", function () {
				$(this).remove();
				_this.callback();
			});
		}, this.data.setting.delay);
	},
	tpl: function tpl() {
		return '<div id="tips">' + this.data.setting.text + '</div>';
	},
	css: function css() {
		$("#tips").css({
			backgroundColor: "#000",
			color: "#fff",
			textAlign: "center",
			position: "fixed",
			left: "50%",
			top: "50%",
			zIndex: "13",
			padding: "20px 40px",
			borderRadius: "8px",
			display: "none"
		}).show();
	},
	alignCenter: function alignCenter() {
		var w = $("#tips").width();
		var h = $("#tips").height();
		$("#tips").css({
			"marginLeft": -Math.floor(w / 2),
			"marginTop": -Math.floor(h / 2)
		});
	},
	callback: function callback() {
		// if ($.isFunction(this.data.setting.callback)) {
		// 	this.data.setting.callback();
		// }
		$.isFunction(this.data.setting.callback) && this.data.setting.callback();
	}
};
function tips(msg, tims, fn) {
	tipsObj.show({ text: msg, delay: tims ? tims : 2000, callback: $.isFunction(fn) ? fn : function () {} });
}
module.exports = tips;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// import {tips} from "./tips.js";
var tips = __webpack_require__(0);
tips("网络状况可能不太好喔");
tips("what?");

/***/ })
/******/ ]);