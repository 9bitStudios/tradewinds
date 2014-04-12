
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var handlebars  = require('express3-handlebars');
var app = express();

app.set('port', process.env.PORT || 1337);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//Show all errors in development
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

// Routes
app.get('/', routes.main.index);
app.get('/other', routes.main.other);
app.get('/admin', routes.admin.index);
app.use(function(request, response){
    response.send(404, 'Route Not Found');
}); 

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
