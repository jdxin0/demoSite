var name = 'zfpx';
var age = 9;
var str = 'hello~${name}今年${age}岁了';
str = str.replace(/\$\{([^}]*)\}/g,function(){
    console.log(arguments);
    // return eval(arguments[1]);
});
console.log(str);