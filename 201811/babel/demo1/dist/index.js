"use strict";

require("core-js/modules/es6.object.assign");

var obj = Object.assign({}, {
  a: 1
}, {
  b: 2
});
console.log(obj);