var http = require('http');
var fs = require('fs');
var url = require('url');
var mime = require('mime')
http.createServer( function (request, response) {  
   var pathname = url.parse(request.url).pathname;
   console.log("Request for " + pathname + " received.");
   // 从文件系统中读取请求的文件内容
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
	 response.write('404');
      }else{	         
         // HTTP 状态码: 200 : OK
         // Content Type: text/plain
         //var len = pathname.split(".").length;
	 //var suffix = pathname.split(".")[len-1];
         response.writeHead(200, {'Content-Type': mime.lookup(pathname)});	
         // 响应文件内容
         //response.write(data.toString());		
       	 response.end(data);
      }
      //  发送响应数据
//      response.end();
   });   
}).listen(8084);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8084/');
