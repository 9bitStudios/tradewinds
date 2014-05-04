var HomeController = require('./controllers/HomeController');
var LoginController = require('./controllers/LoginController');
var AdminController = require('./controllers/AdminController');
var PostController = require('./controllers/PostController');
var InstallController = require('./controllers/InstallController');
var ProfileController = require('./controllers/ProfileController');

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
    
    app.get('/admin/posts', AdminController.PostsViewAll);     
    app.get('/admin/post/add', AdminController.PostAdd);  
    app.post('/admin/post/add', AdminController.PostCreate);     
    app.get('/admin/post/edit/:id', AdminController.PostEdit); 
    app.post('/admin/post/edit', AdminController.PostUpdate);
    app.get('/admin/post/delete/:id', AdminController.PostDelete);
    
    app.get('/admin/signups', AdminController.SignUpsViewAll); 
    
    // Installation Routes
    
    app.get('/install', InstallController.Index);
    app.post('/install', InstallController.Install);      
    app.get('/install/success', InstallController.InstallSuccess);

    // Profile Routes

    app.get('/signup', ProfileController.SignUp);    
    app.post('/signup', ProfileController.SignUpAdd);
    app.get('/signup/checkemail', ProfileController.CheckEmail);
    app.get('/signup/confirm/:id', ProfileController.SignUpConfirm); 
    app.get('/signup/thanks', ProfileController.SignUpThanks);
    app.get('/signup/invalid', ProfileController.SignUpInvalid); 
    
    app.get('/*', PostController.Process);
       
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
