var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var urlLib = require("url");
var server = http.createServer(function(req, res) {
    var str = "";
    req.on("data", function(data) {
        str = str + data;
    });
    req.on("end", function() {
        var Get = {};
        var obj = urlLib.parse(req.url, true);
        var url = obj.pathname;
        Get = obj.query;
        var Post = {};
        Post = qs.parse(str);
        console.log(url, Get, Post);
        fs.readFile("./www" + url, function(err, data) {
            if (err) {
                res.write("404");
            } else {
                res.write(data);
            }
            res.end();
        });
    });
});
server.listen(8080);
