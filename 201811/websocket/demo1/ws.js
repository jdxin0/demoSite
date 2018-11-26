var http = require('http');
var fsLib = require('fs');
var io = require('socket.io');

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
var WebSocketServer = io.listen(server);
WebSocketServer.on('connection', function (client) {
    // client.on('say', function (data) {
    //     if(data === 'hello'){
    //         client.emit('reply','hello from server');
    //     }
    // });
    setTimeout(function(){
        client.emit('reply','hello from server');
    },1500);
    client.on('disconnect', function () { });
});
console.log('server have start on http://localhost:8080');