var HomeController = require('./controllers/HomeController');
var AdminController = require('./controllers/AdminController');
var InstallController = require('./controllers/InstallController');

// Routes
module.exports = function(app){
    
    // Main Routes
    
    app.get('/', HomeController.index);
    app.get('/other', HomeController.other);
    
    // Admin Routes
    
    app.get('/admin', AdminController.index);
    app.get('/admin/debug', AdminController.debug);  
    
    // Installation Routes
    
    app.get('/install', InstallController.index);
    app.post('/install', InstallController.install);      
    
    // Errors   
    
    // 404
    
    app.use(function(request, response){
	response.status(404);
        response.render('errors/404', { 
	    title: '404', 
	    message: 'The requested resource was not found...', 
	    layout: 'error'
	});
    });     
    
}
