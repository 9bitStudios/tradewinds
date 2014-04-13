var HomeController = require('./controllers/HomeController');
var AdminController = require('./controllers/AdminController');

// Routes
module.exports = function(app){
    
    // Main Routes
    
    app.get('/', HomeController.index);
    app.get('/other', HomeController.other);
    
    // Admin Routes
    
    app.get('/admin', AdminController.index);
	app.get('/admin/debug', AdminController.debug);
    
    // 404
    
    app.use(function(request, response){
        response.send(404, 'Route Not Found');
    }); 
    
}
