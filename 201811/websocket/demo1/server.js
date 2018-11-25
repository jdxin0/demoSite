var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function (client) {
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
server.listen(3000);