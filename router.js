var HomeController = require('./controllers/HomeController');
var AdminController = require('./controllers/AdminController');
var PostController = require('./controllers/PostController');
var InstallController = require('./controllers/InstallController');
var ProfileController = require('./controllers/ProfileController');

// Routes
module.exports = function(app){
    
    // Main Routes
    
    app.get('/', HomeController.Index);
    app.get('/other', HomeController.Other);
       
    // Admin Routes
    
    app.get('/admin', AdminController.Index);
    app.get('/admin/login', AdminController.Login);
    app.post('/admin/login', AdminController.AuthenticateAdmin);    
    app.get('/admin/logout', AdminController.Logout);    
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
    
    app.get('/admin/categories', AdminController.CategoriesViewAll);     
    app.get('/admin/category/add', AdminController.CategoryAdd);  
    app.post('/admin/category/add', AdminController.CategoryCreate);     
    app.get('/admin/category/edit/:id', AdminController.CategoryEdit); 
    app.post('/admin/category/edit', AdminController.CategoryUpdate);
    app.get('/admin/category/delete/:id', AdminController.CategoryDelete);    
    
    app.get('/admin/menus', AdminController.MenusViewAll);     
    app.get('/admin/menu/add', AdminController.MenuAdd);  
    app.post('/admin/menu/add', AdminController.MenuCreate);     
    app.get('/admin/menu/edit/:id', AdminController.MenuEdit); 
    app.post('/admin/menu/edit', AdminController.MenuUpdate);
    app.get('/admin/menu/delete/:id', AdminController.MenuDelete);     
    
    app.get('/admin/signups', AdminController.SignUpsViewAll); 
    
    // Installation Routes
    
    app.get('/install', InstallController.Index);
    app.post('/install', InstallController.Install);      
    app.get('/install/success', InstallController.InstallSuccess);

    // Profile Routes
    app.get('/profile', ProfileController.Index);
    app.get('/profile/login', ProfileController.Login);
    app.post('/profile/login', ProfileController.AuthenticateProfile);
    app.get('/profile/logout', ProfileController.Logout);
    app.get('/profile/dashboard', ProfileController.Dashboard);
    app.get('/profile/dashboard/edit', ProfileController.ProfileEdit);
    app.post('/profile/dashboard/edit', ProfileController.ProfileUpdate);
    
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
