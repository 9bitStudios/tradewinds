var HomeController = require('./controllers/HomeController');
var AdminController = require('./controllers/AdminController');
var InstallController = require('./controllers/InstallController');

// Routes
module.exports = function(app){
    
    // Main Routes
    
    app.get('/', HomeController.Index);
    app.get('/other', HomeController.Other);
    
    // Admin Routes
    
    app.get('/admin', AdminController.Index);
    app.get('/admin/user/add', AdminController.AddUser);  
    app.post('/admin/user/add', AdminController.CreateUser);
    app.get('/admin/debug', AdminController.Debug);  
    
    // Installation Routes
    
    app.get('/install', InstallController.Index);
    app.post('/install', InstallController.Install);      
    
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
