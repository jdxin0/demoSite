var http = require('http');
var server = http.createServer(function(req,res){
    console.log(req.url);
    console.log(req.method);
    res.write('hello');
    res.end();
});
server.listen(8080);
console.log('server have start on http://localhost:8080');