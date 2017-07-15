var http= require('http');
var hostname = 'localhost';
var port = '3001';

var fs = require('fs');
var path = require('path');


var server = http.createServer(function (req,res) {
	// body...
	console.log('Request for '+ req.url + ' by '+ req.method+ ' method.');
	var fileurl;
	if (req.method=='GET') {
		if (req.url=='/') {
			fileurl='/index.html';
		}
		else fileurl=req.url;

		var filepath;
		filepath= path.resolve('./public'+fileurl);
		var fileext;
		fileext = path.extname(filepath);
		if(fileext=='.html')
		{
			fs.exists(filepath, function(exists){
				if(!exists){
					res.writeHead(404,{"Content-Type":"text/html"});
					res.end('<h1>Error 404 : '+ fileurl+' not found</h1>');
					}
				else{
					res.writeHead(200,{"Content-Type":"text/html"});
					fs.createReadStream(filepath).pipe(res);
				}

				});
		}
		else{
			res.writeHead(404,{"Content-Type":"text/html"});
			res.end('<h1>Error 404 : file is not html</h1>');
		}
	} 
	else {
		res.writeHead(501,{"Content-Type":"text/html"});
		res.end('<h1>Error 501: '+req.method+' method not supported</h1>');
	}
});

server.listen(port, hostname, function(){
  console.log('Server running at http://'+hostname+':'+port+'/');
});
