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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*global app*/
var mod1 = __webpack_require__(1);
var mod2 = __webpack_require__(2);
var mod3 = __webpack_require__(3);
var mod4 = __webpack_require__(4);
window.app = {
	init: function () {
		this.loadFn();
		this.setText();
		this.setStyle();
		this.printDataA();
		this.printDataB();
	},
	data: {
		a: 1,
		b: 2
	},
	loadFn: function () {
		for (var key in this.methods) {
			this[key] = this.methods[key];
		}
	},
	methods: {
		setText: mod1.setText,
		setStyle: mod2.setStyle,
		printDataA: mod3.printDataA,
		printDataB: mod4.printDataB
	}
};
app.init();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
	setText: function () {
		document.getElementById('app').innerText = 'Hello Webpack!';
	}
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
	setStyle: function () {
		document.getElementById('app').style.color = 'blue';
	}
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {
	printDataA: function () {
		console.log(this.data.a);
	}
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
	printDataB: function () {
		console.log(this.data.b);
	}
};

/***/ })
/******/ ]);