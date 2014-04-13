var MainController = require('./controllers/main');
var AdminController = require('./controllers/admin');

// Routes
module.exports = function(app){
    
    app.get('/', MainController.index);
    app.get('/other', MainController.other);
    app.get('/admin', AdminController.index);
    app.use(function(request, response){
	response.send(404, 'Route Not Found');
    }); 
    
}
