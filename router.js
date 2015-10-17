var HomeController = require('./controllers/HomeController');
var AdminController = require('./controllers/AdminController');
var PostController = require('./controllers/PostController');
var InstallController = require('./controllers/InstallController');
var Authentication = require('./utilities/Authentication');

// Routes
module.exports = function(app){
    
    // Main Routes
    
    app.get('/', HomeController.Index);
    app.get('/other', HomeController.Other);
       
    // Admin Routes
    
    app.get('/admin', Authentication.AuthenticateAdmin, AdminController.Index);
    app.get('/admin/login', AdminController.Login);
    app.post('/admin/login', AdminController.VerifyLogin);    
    app.get('/admin/logout', AdminController.Logout);    
    app.get('/admin/users', Authentication.AuthenticateAdmin, AdminController.UsersViewAll);     
    app.get('/admin/user/add', Authentication.AuthenticateAdmin, AdminController.UserAdd);  
    app.post('/admin/user/add', Authentication.AuthenticateAdmin, AdminController.UserCreate); 
    app.get('/admin/user/edit/:id', Authentication.AuthenticateAdmin, AdminController.UserEdit); 
    app.post('/admin/user/edit', Authentication.AuthenticateAdmin, AdminController.UserUpdate);
    app.get('/admin/user/delete/:id', Authentication.AuthenticateAdmin, AdminController.UserDelete); 
    
    app.get('/admin/posts', Authentication.AuthenticateAdmin, AdminController.PostsViewAll);     
    app.get('/admin/post/add', Authentication.AuthenticateAdmin, AdminController.PostAdd);  
    app.post('/admin/post/add', Authentication.AuthenticateAdmin, AdminController.PostCreate);     
    app.get('/admin/post/edit/:id', Authentication.AuthenticateAdmin, AdminController.PostEdit); 
    app.post('/admin/post/edit', Authentication.AuthenticateAdmin, AdminController.PostUpdate);
    app.get('/admin/post/delete/:id', Authentication.AuthenticateAdmin, AdminController.PostDelete);
    
    app.get('/admin/categories', Authentication.AuthenticateAdmin, AdminController.CategoriesViewAll);     
    app.get('/admin/category/add', Authentication.AuthenticateAdmin, AdminController.CategoryAdd);  
    app.post('/admin/category/add', Authentication.AuthenticateAdmin, AdminController.CategoryCreate);     
    app.get('/admin/category/edit/:id', Authentication.AuthenticateAdmin, AdminController.CategoryEdit); 
    app.post('/admin/category/edit', Authentication.AuthenticateAdmin, AdminController.CategoryUpdate);
    app.get('/admin/category/delete/:id', Authentication.AuthenticateAdmin, AdminController.CategoryDelete);    
    
    app.get('/admin/menus', Authentication.AuthenticateAdmin, AdminController.MenusViewAll);     
    app.get('/admin/menu/add', Authentication.AuthenticateAdmin, AdminController.MenuAdd);  
    app.post('/admin/menu/add', Authentication.AuthenticateAdmin, AdminController.MenuCreate);     
    app.get('/admin/menu/edit/:id', Authentication.AuthenticateAdmin, AdminController.MenuEdit); 
    app.post('/admin/menu/edit', Authentication.AuthenticateAdmin, AdminController.MenuUpdate);
    app.get('/admin/menu/delete/:id', Authentication.AuthenticateAdmin, AdminController.MenuDelete);     
    
    // Installation Routes
    
    app.get('/install', InstallController.Index);
    app.post('/install', InstallController.Install);      
    app.get('/install/success', InstallController.InstallSuccess);
    
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
    
};
