
var APPLICATION_ROOT = __dirname;
var PORT = 1337;

var http = require('http');
var tw = require('tw');

http.createServer(function (request, response) {
	
	tw.route(request, response);
	
}).listen(PORT);
 