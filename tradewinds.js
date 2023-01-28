
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var multer = require('multer');
var logger = require('morgan');
var csrf = require('csurf');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var MongoStore = require('connect-mongo');
var http = require('http');
var path = require('path');
var handlebars  = require('express-handlebars'), hbs;
var config = require('./config');
var Middleware = require('./utilities/Middleware');
var app = express();

app.set('port', config[config.environment].application.port);
app.set('views', path.join(__dirname, 'views'));

/* express3-handlebars - https://github.com/ericf/express-handlebars
A Handlebars view engine for Express. */
hbs = handlebars.create({
    helpers: {
        ifCond: function(v1, operator, v2, options) {

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

/* Morgan - https://github.com/expressjs/morgan
 HTTP request logger middleware for node.js */
app.use(logger({ format: 'dev', immediate: true }));

/* cookie-parser - https://github.com/expressjs/cookie-parser
 Parse Cookie header and populate req.cookies with an object keyed by the cookie names. */
app.use(cookieParser(config[config.environment].application.cookieKey));

/* express-session - https://github.com/expressjs/session
 Simple session middleware for Express */
app.use(session({
    secret: config[config.environment].application.sessionKey,
    store: new MongoStore({
        mongoUrl: 'mongodb://'+ config[config.environment].database.host+'/'+ config[config.environment].database.name
    })
}));

/* multer - https://github.com/expressjs/multer
Multer is a node.js middleware for handling multipart/form-data. It is written on top of busboy for maximum efficiency. */
app.use(multer({
    dest: path.join(__dirname, 'uploads')
}).any());

/* body-parser - https://github.com/expressjs/body-parser 
Node.js body parsing middleware. */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* method-override - https://github.com/expressjs/method-override
 Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it. */		    
app.use(methodOverride());

/* csurf - https://github.com/expressjs/csurf
Node.js CSRF protection middleware. Requires either a session middleware or cookie-parser to be initialized first. */	
app.use(csrf());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static')));

app.use(Middleware.CSRFToken);
app.use(Middleware.AppendPageInfo);
app.use(Middleware.AppendNotifications);

/* errorhandler - https://github.com/expressjs/errorhandler
 Show errors in development. */
app.use(errorHandler({ dumpExceptions: true, showStack: true }));

// send app to router
require('./router')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
