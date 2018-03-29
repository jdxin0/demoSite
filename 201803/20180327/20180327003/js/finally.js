//ES2018 引入标准的。
if (!Promise.prototype.finally) {
    Promise.prototype.finally = function(callback) {
        let P = this.constructor;
        return this.then(
            value => P.resolve(callback()).then(() => value),
            reason => P.resolve(callback()).then(() => { throw reason })
        );
    };
}
new Promise(function(resolve,reject){
    if (false) {
        resolve("luojianet");
    }else{
        reject("error");
    }
}).then(function(val){
    console.log(val);
}).catch(function(err){
    console.log(err);
}).finally(function(){
    console.log("finally");
});