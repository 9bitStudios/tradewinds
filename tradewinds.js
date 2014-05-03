
var express = require('express');
var MongoStore = require('connect-mongo')(express);
var http = require('http');
var path = require('path');
var handlebars  = require('express3-handlebars');
var config = require('./config');
var configEnvironment = config.environment;
var app = express();

app.set('port', config[configEnvironment].application.port);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser());
app.use(express.cookieParser(config[configEnvironment].application.cookieKey));
app.use(express.session({
  store: new MongoStore({
    url: 'mongodb://'+ config[configEnvironment].database.host+'/'+ config[configEnvironment].database.name
  })
}));
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

//Show all errors in development
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

// send app to router
require('./router')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
