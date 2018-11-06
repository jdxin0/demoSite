var fs = require('fs');
// fs.readFile('1.txt','utf-8',function(err,data){
//     if(err){
//         console.log(err);
//         return;
//     }
//     fs.readFile(data,'utf-8',function(err,data){
//         if(err) throw err;
//         console.log(data);
//     });
// });
function readFile(url) {
    return new Promise(function(resolve,reject){
        fs.readFile(url, 'utf-8', function (err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
}
// readFile('1.txt').then(function(data){
//     return readFile(data);
// }).then(function(data){
//     console.log(data);
// });

readFile('1.txt').then(function(data){
    console.log(data);
    return data;
}).then(data=>{
    return readFile(data);
}).then(data=>{
    console.log(data);
    throw new Error('出错');
}).then(data=>{
    console.log(data);
},err=>{
    return err;
}).then(data=>{
    console.log(data);
}).then(data=>{
    console.log(data);
}).then(data=>{
    console.log(data);
}).then(data=>{
    console.log(data);
}).then(data=>{
    console.log(data);
}).catch(function(err){
    console.log(err);
});