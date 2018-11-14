const babel = require('@babel/core');
var user = ()=>{
    console.log('user');
};
console.log(babel.transform(user).code);
