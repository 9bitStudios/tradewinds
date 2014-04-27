
var express = require('express');
var MongoStore = require('connect-mongo')(express);
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
app.use(express.bodyParser());
app.use(express.cookieParser('S3CRE7'));
app.use(express.session({
  store: new MongoStore({
    url: 'mongodb://localhost/tradewinds'
  })
}));
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//Show all errors in development
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

// send app to router
require('./router')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
