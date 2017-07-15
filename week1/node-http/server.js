var http= require('http');
var hostname = 'localhost';
var port = '3000';

var server = http.createServer(function (reques,respon) {
	// body...
	console.log(reques.headers);

	respon.writeHead(200,{'Content-Type' : 'text/html'});
	respon.end('<h1>Hello World</h1>');
});

server.listen(port, hostname, function () {
	// body...
	console.log('Server running at http://$(hostname):$(port)/');
});