var db = require('./database');
var mongoose = require('mongoose');

exports.index = function(request, response){
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');
};

exports.other = function(request, response){
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Other\n');
};

