var http = require('http');
var fsLib = require('fs');

var server = http.createServer(function(req,res){
    console.log(req.url);
    console.log(req.method);
    fsLib.readFile(`www${req.url}`,function(err,data){
        if(err){
            // console.log(err);
            res.writeHead(404);
            res.write('Not Found');
            res.end();
        }else{
            res.write(data);
            res.end();
        }
        
    });
    
});
server.listen(8080);
console.log('server have start on http://localhost:8080');