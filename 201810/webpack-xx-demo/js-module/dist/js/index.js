/*! [@luojianet](http://www.xuliehaonet.com) */
!function(n){function t(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var e={};t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:r})},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},t.p="dist/",t(t.s=0)}([function(n,t,e){"use strict";var r=e(1),o=(0,r.formatDate)(new Date,"yyyy-MM-dd hh:mm:ss");document.getElementById("timer").innerText=o;console.log("1,2")},function(n,t,e){"use strict";function r(n){return String(n).replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")}function o(n){return String(n).replace(/(.{2}).+(.{2}@.+)/,"$1****$2")}function u(n,t){t=t||("[object Array]"==Object.prototype.toString.call(n)?[]:{});for(var e in n)"object"==typeof n[e]?(n[e].constructor===Array?t[e]=[]:t[e]={},u(n[e],t[e])):t[e]=n[e];return t}function i(n,t){var e={"M+":n.getMonth()+1,"d+":n.getDay(),"h+":n.getHours(),"m+":n.getMinutes(),"s+":n.getSeconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(n.getFullYear()+"").substr(4-RegExp.$1.length)));for(var r in e)new RegExp("("+r+")").test(t)&&(t=t.replace(RegExp.$1,1===RegExp.$1.length?e[r]:("00"+e[r]).substr((""+e[r]).length)));return t}function c(n){var t=Object.prototype.toString.call(n);return t=t.replace(/\[object\s(\w+)\]/,"$1"),t.toLowerCase()}function a(n){n=n.replace(/\[/g,"%5B"),n=n.replace(/\]/g,"%5D");var t=arguments[1]?arguments[1]:location.search,e=new RegExp("^.*[\\?|\\&]"+n+"\\=([^\\&]*)"),r=t.match(e);return null!=r?decodeURIComponent(r[1]):""}function d(n){var t=0;for(var e in n)"undefined"!=e&&t++;return t}function s(n,t,e){var r=document.domain,o=new Date;o.setTime(o.getTime()+60*e*60*1e3),document.cookie=encodeURIComponent(n)+"="+encodeURIComponent(t)+"; path=/; domain="+r+"; expires="+o.toUTCString()}function f(n){var t=document.cookie.match(new RegExp("(^| )"+n+"=([^;]*)(;|$)"));return null!=t?unescape(t[2]):null}function l(n){document.cookie=encodeURIComponent(n)+"=; path=/; domain="+document.domain+"; expires=expires=Thu, 01 Jan 1970 00:00:00 GMT"}function m(n,t){return Math.floor(Math.random()*(t-n+1)+n)}function p(){return Math.ceil(10*Math.random())}function g(){return Math.floor(10*Math.random())}function h(){return Math.round(Math.random())}function v(n){return parseInt(Math.random()*n,10)+1}function y(n){return parseInt(Math.random()*(n+1),10)}function b(n){var t,e,r,o,u,i=function(n){return n.split("&").join(",")};for(t in n)switch(e=t.split("|"),e.length){case 3:r=i(e[0]),o=i(e[1]),u=i(e[2]),-1!=r.indexOf("document")&&(r=document),$(r).on(u,o,n[t]);break;case 2:o="window"===i(e[0])?window:i(e[0]),u=i(e[1]),$(o).on(u,n[t])}}function w(n){var t=document.createElement("div");return t.appendChild(document.createTextNode(n)),t.innerHTML}function x(n){var t=document.createElement("div");return t.innerHTML=n,t.innerText||t.textContent}function S(){var n=navigator.userAgent.toLowerCase();return!(!window.XLJSWebViewBridge&&"thunder"!=n.match(/Thunder/i))}function M(){return"micromessenger"==navigator.userAgent.toLowerCase().match(/MicroMessenger/i)}function C(){return/ipad/i.test(navigator.userAgent.toLowerCase())}function E(){return/\b(iPad|iPhone|iPod)\b.*? OS ([\d_]+)/.test(navigator.userAgent)}function j(){return/\bAndroid([^;]+)/.test(navigator.userAgent)}function R(n){var t=document.getElementsByTagName("head")[0],e=n,r=document.createElement("link");r.id="dynamic-style",r.href=e,r.setAttribute("rel","stylesheet"),r.setAttribute("media","all"),r.setAttribute("type","text/css"),t.appendChild(r)}function T(n,t){var e=document.getElementsByTagName("head")[0],r=document.createElement("script");r.onload=r.onreadystatechange=function(){this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(t&&t(),r.onload=r.onreadystatechange=null)},r.setAttribute("type","text/javascript"),r.setAttribute("src",n),e.appendChild(r)}function A(n,t){var e=$(window).scrollTop(),r=e+$(window).height(),o=$(n).offset().top,u=o+$(n).height();return!0===t?e<o&&r>u:o<=r&&u>=e}function I(n){for(var t=[],e=0;e<n.length;e++)t[e]=("00"+n.charCodeAt(e).toString(16)).slice(-4);return"\\u"+t.join("\\u")}function N(n){return n=n.replace(/\\/g,"%"),unescape(n)}function U(n){var t=[],e=0;n=(n||0).toString().split("");for(var r=n.length-1;r>=0;r--)e++,t.unshift(n[r]),e%3||0==r||t.unshift(",");return t.join("")}function O(n){n=n.toString().split(".");for(var t=n[0].split("").reverse(),e=[],r=0,o=t.length;r<o;r++)r%3==0&&0!==r&&e.push(","),e.push(t[r]);return e.reverse(),e=n[1]?e.join("").concat("."+n[1]):e.join("")}function _(n){return n.toString().replace(/\d+/,function(n){return n.replace(/(\d)(?=(\d{3})+$)/g,function(n){return n+","})})}function k(n){for(var t=null,e=0;e<n.length;e++)for(var r=0;r<n.length-1-e;r++)n[r]>n[r+1]&&(t=n[r],n[r]=n[r+1],n[r+1]=t);return n}function L(n){return n.trim?n.trim():n.replace(/^\s+|\s+$/gi,"")}function P(n,t){new CountUp("myTargetElement",n,t,0,1,{useEasing:!1,useGrouping:!1,formattingFn:function(n){var t="";return $.each(("00000"+n.toString()).slice(-5).split(""),function(n,e){t+="<em>"+e+"</em>"}),t}}).start()}Object.defineProperty(t,"__esModule",{value:!0}),e.d(t,"hidePhoneNum",function(){return r}),e.d(t,"hideEmailSec",function(){return o}),e.d(t,"deepCopy",function(){return u}),e.d(t,"formatDate",function(){return i}),e.d(t,"getDataType",function(){return c}),e.d(t,"getUrlParam",function(){return a}),e.d(t,"objectLength",function(){return d}),e.d(t,"setCookie",function(){return s}),e.d(t,"getCookie",function(){return f}),e.d(t,"clearCookie",function(){return l}),e.d(t,"getRandomNum",function(){return m}),e.d(t,"getRandomNum1_10",function(){return p}),e.d(t,"getRandomNum0_9",function(){return g}),e.d(t,"getRandomNum0or1",function(){return h}),e.d(t,"getRandomNum1_Max",function(){return v}),e.d(t,"getRandomNum0_Max",function(){return y}),e.d(t,"initEvents",function(){return b}),e.d(t,"htmlencode",function(){return w}),e.d(t,"htmldecode",function(){return x}),e.d(t,"isShoulei",function(){return S}),e.d(t,"isWeixin",function(){return M}),e.d(t,"isIpad",function(){return C}),e.d(t,"isIOS",function(){return E}),e.d(t,"isAndroid",function(){return j}),e.d(t,"injectStyle",function(){return R}),e.d(t,"injectScript",function(){return T}),e.d(t,"isElementInView",function(){return A}),e.d(t,"encodeUnicode",function(){return I}),e.d(t,"decodeUnicode",function(){return N}),e.d(t,"thousandsSeparator1",function(){return U}),e.d(t,"thousandsSeparator2",function(){return O}),e.d(t,"thousandsSeparator3",function(){return _}),e.d(t,"bubbleSort",function(){return k}),e.d(t,"trim",function(){return L}),e.d(t,"moneyCountUp",function(){return P})}]);
//# sourceMappingURL=index.js.map