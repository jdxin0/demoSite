const http = require("http");
var server = http.createServer(function(req,res){
    console.log("begin");
    res.write("123");
    res.end();
    console.log("end");
});
server.listen(8080);
// console.log(server);
