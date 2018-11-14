"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

var arr = Array.from([,,,]);
console.log(arr);