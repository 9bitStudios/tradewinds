var HomeController = require('./controllers/HomeController');
var LoginController = require('./controllers/LoginController');
var AdminController = require('./controllers/AdminController');
var InstallController = require('./controllers/InstallController');

// Routes
module.exports = function(app){
    
    // Main Routes
    
    app.get('/', HomeController.Index);
    app.get('/other', HomeController.Other);
    
    // Login Routes
    
    app.get('/login', LoginController.Index);
    app.post('/login', LoginController.Authenticate);    
    app.get('/logout', LoginController.Logout);
    
    // Admin Routes
    
    app.get('/admin', AdminController.Index);
    app.get('/admin/users', AdminController.UsersViewAll);     
    app.get('/admin/user/add', AdminController.UserAdd);  
    app.post('/admin/user/add', AdminController.UserCreate); 
    app.get('/admin/user/edit/:id', AdminController.UserEdit); 
    app.post('/admin/user/edit', AdminController.UserUpdate);
    app.get('/admin/user/delete/:id', AdminController.UserDelete); 
    
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
