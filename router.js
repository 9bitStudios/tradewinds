var MainController = require('./controllers/main');
var AdminController = require('./controllers/admin');

// Routes
module.exports = function(app){
    
    // Main Routes
    
    app.get('/', MainController.index);
    app.get('/other', MainController.other);
    
    // Admin Routes
    
    app.get('/admin', AdminController.index);
	app.get('/admin/debug', AdminController.debug);
    
    // 404
    
    app.use(function(request, response){
        response.send(404, 'Route Not Found');
    }); 
    
}
