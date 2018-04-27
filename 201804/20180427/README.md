# 创建 Library
除了打包应用程序代码，webpack 还可以用于打包 JavaScript library。以下指南适用于希望流水线化(streamline)打包策略的 library 作者。

# 创建一个 library
假设你正在编写一个名为 numbers-convert 的小的 library，可以将数字 0 到 5 转换为文本表示，反之亦然，例如将 2 转换为 'two'。

# 该 library 的使用方式如下：
```js
// ES2015 模块引入
import * as numbersConvert from 'numbers-convert';
// CommonJS 模块引入
var numbersConvert = require('numbers-convert');
// ...
// ES2015 和 CommonJS 模块调用
numbersConvert.wordToNum('Two');
// ...
// AMD 模块引入
require(['numbersConvert'], function ( numbersConvert) {
  // ...
  // AMD 模块调用
  numbersConvert.wordToNum('Two');
  // ...
});
```