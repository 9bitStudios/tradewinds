
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var multer = require('multer');
var logger = require('morgan');
var csrf = require('csurf');
var methodOverride = require('errorhandler');
var errorHandler = require('csurf');
var MongoStore = require('connect-mongo')(session);
var http = require('http');
var path = require('path');
var handlebars  = require('express3-handlebars'), hbs;
var config = require('./config');
var Middleware = require('./utilities/Middleware');
var app = express();

app.set('port', config[config.environment].application.port);
app.set('views', path.join(__dirname, 'views'));

hbs = handlebars.create({
   helpers:{
       ifCond: function(v1, operator, v2, options){
	   
	  v1 = v1.toString(); 
	  v2 = v2.toString();  
	  
	  switch (operator) {
	    case '==':
		return (v1 == v2) ? options.fn(this) : options.inverse(this);
	    case '===':
		return (v1 === v2) ? options.fn(this) : options.inverse(this);
	    case '<':
		return (v1 < v2) ? options.fn(this) : options.inverse(this);
	    case '<=':
		return (v1 <= v2) ? options.fn(this) : options.inverse(this);
	    case '>':
		return (v1 > v2) ? options.fn(this) : options.inverse(this);
	    case '>=':
		return (v1 >= v2) ? options.fn(this) : options.inverse(this);
	    case '&&':
		return (v1 && v2) ? options.fn(this) : options.inverse(this);
	    case '||':
		return (v1 || v2) ? options.fn(this) : options.inverse(this);
	    default:
		return options.inverse(this);
	   }
       }
   },
   defaultLayout: 'main'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(logger());
app.use(cookieParser(config[config.environment].application.cookieKey));
app.use(session({
  secret: 'ASDF123',
  store: new MongoStore({
    url: 'mongodb://'+ config[config.environment].database.host+'/'+ config[config.environment].database.name
  })
}));
app.use(multer({ dest: './uploads/'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(csrf());
app.use(express.static(path.join(__dirname, 'public')));
app.use(Middleware.CSRFToken);
app.use(Middleware.AppendPageInfo);
app.use(Middleware.AppendNotifications);

//Show all errors in development
app.use(errorHandler({ dumpExceptions: true, showStack: true }));

// send app to router
require('./router')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
