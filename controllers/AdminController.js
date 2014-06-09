var Helpers = require('../utilities/Helpers');
var Validation = require('../utilities/Validation');
var Model = require('../models/Models');
var bcrypt = require('bcrypt-nodejs');
var defaultLayout = 'admin';

function Authenticate(request, response) {
    if(!request.session.userid || !request.session.username || !request.session.admin) {
	response.redirect('/admin/login');
    }
}

// Admin - Home

exports.Index = function(request, response){

    Authenticate(request, response);
    response.pageInfo.title = 'Administration Panel Home';
    response.pageInfo.layout = defaultLayout;
    response.pageInfo.userInfo.name = request.session.username;
    response.render('admin/Index', response.pageInfo);
    
};

exports.Login = function(request, response){

    if(request.session.user && request.session.admin)
	response.redirect('/admin');
    
    response.pageInfo.title = 'Login';
    response.render('admin/Login', response.pageInfo);
};

exports.Logout = function(request, response){
    request.session.destroy();
    response.redirect('/admin/login');
};

exports.AuthenticateAdmin = function(request, response){

    Model.UserModel.findOne({ 'name': request.body.username, isAdmin: true }, 'name password', function(error, user){
	if (error){
	    Validation.ErrorRedirect(response, '/admin/login', 'loginFailed');
	}
	
	// user found
	if(user) {
	    // compare passwords
	    if(bcrypt.compareSync(request.body.password, user.password)) {
		request.session.userid = user._id;
		request.session.username = user.name;
		request.session.admin = 1;
		response.redirect('/admin');
	    }
	    else {
		Validation.ErrorRedirect(response, '/admin/login', 'loginFailed');
	    }
	}
	else {
	    Validation.ErrorRedirect(response, '/admin/login', 'loginFailed');
	}
	
    });
    
};

// Admin - View All Users

exports.UsersViewAll = function(request, response){

    Authenticate(request, response);
    Model.UserModel.find(function(error, result){
	
	if (error) {
	    Validation.ErrorRedirect(response, '/admin', 'usersNotFound');
	}	
	
	response.pageInfo.title = 'View All Users';
	response.pageInfo.layout = defaultLayout;
	response.pageInfo.userInfo.name = request.session.username;	
	response.pageInfo.users = result;
	response.render('admin/UsersViewAll', response.pageInfo);
	
    });

};

// Admin - Add User

exports.UserAdd = function(request, response){

    Authenticate(request, response);
    response.pageInfo.title = 'Add User';
    response.pageInfo.layout = defaultLayout;
    response.pageInfo.userInfo.name = request.session.username;	
    response.render('admin/UserAdd', response.pageInfo);
    
};

// Admin - Create User

exports.UserCreate = function(request, response){
    
    Authenticate(request, response);
    
    var errors = false;
    
    var name = request.body.name;
    var email = request.body.email;
    var password = request.body.password;
    var password2 = request.body.password2;
    
    if(Validation.IsNullOrEmpty([name, email, password, password2])) {
	errors = true;
    }
    if(!Validation.Equals(password, password2)) {
	errors = true;    
    }
    if(!Validation.ValidateEmail(email)) {
	errors = true;
    }
    
    if(errors)
	Validation.ErrorRedirect(response, '/admin/users', 'userAddError');  
    else {
	
	Model.UserModel.findOne({ email: email }, function(error, result){

	    // user email already exists
	    if(result){
		Validation.ErrorRedirect(response, '/admin/users', 'userExists');  
	    }
	    else {
		
		var salt = bcrypt.genSaltSync(10);
		var passwordHash = bcrypt.hashSync(password, salt);

		var u = new Model.UserModel({ 
		    name: name,
		    password: passwordHash,
		    email: email,
		    avatar: 'placeholder.png',
		    isAdmin: false,
		    isDefault: false
		});

		u.save(function(error){

		    if(error)
			Validation.ErrorRedirect(response, '/admin/users', 'userAddError');
		    else
			Validation.SuccessRedirect(response, '/admin/users', 'userAdded');  
		});		
		
	    }

	});	

    }
};

// Admin - Edit User

exports.UserEdit = function(request, response){

    Authenticate(request, response);
    var id = request.params.id;
    
    Model.UserModel.findOne({ _id: id }, function(error, result){

	if(error) {
	    Validation.ErrorRedirect(response, '/admin/users', 'userNotFoundError');
	}
	response.pageInfo.title = 'Edit User';
	response.pageInfo.layout = defaultLayout;
	response.pageInfo.userInfo.name = request.session.username;		
	response.pageInfo.user = {
	    id: result._id,
	    name: result.name,
	    email: result.email,
	    avatar: result.avatar,
	    isAdmin: result.isAdmin,		
	    isDefault: result.isDefault
	};
	response.render('admin/UserEdit', response.pageInfo);
	
    });
    
};

// Admin - Update User

exports.UserUpdate = function(request, response){

    Authenticate(request, response);
    
    var errors = false;
    var isAdmin = false;
    
    var name = request.body.name;
    var email = request.body.email;
    var avatar = request.body.avatar;
    var admin = request.body.admin;
    
    if(Validation.IsNullOrEmpty([name, email, avatar]))
	errors = true;
    if(!Validation.ValidateEmail(email))
	errors = true;
    
    if(admin === 'admin')
	isAdmin = true;
    
    if(errors)
	Validation.ErrorRedirect(response, '/admin/users', 'userUpdateError');      
    else {
	
	Model.UserModel.update(
	    { _id: request.body.id }, 
	    {
		name: name,
		email: email,
		avatar: avatar,
		isAdmin: isAdmin
	    },
	    { multi: true }, 
	    function(error, result){
		if(error) {
		    Validation.ErrorRedirect(response, '/admin/users', 'userUpdateError');
		}
		else {
		    Validation.SuccessRedirect(response, '/admin/users', 'userUpdated');
		}
	    }
	);	
    }
};

// Admin - Delete User

exports.UserDelete = function(request, response){

    Authenticate(request, response);

    Model.UserModel.remove({ _id: request.params.id, isDefault: false }, function(error, result) {
	if (error) {
	    Validation.ErrorRedirect(response, '/admin/users', 'userDeleteError');
	}
	else {
	    Validation.SuccessRedirect(response, '/admin/users', 'userDeleted');
	}
	    
    });
};

// Admin - View All Posts

exports.PostsViewAll = function(request, response){

    Authenticate(request, response);

    Model.PostModel.find(function(error, result){
	
	if (error) {
	    Validation.ErrorRedirect(response, '/admin', 'postsNotFound');
	}	
	
	response.pageInfo.title = 'Posts';
	response.pageInfo.layout = defaultLayout;
	response.pageInfo.userInfo.name = request.session.username;    	
	response.pageInfo.posts = result;  
	response.render('admin/PostsViewAll', response.pageInfo);
	
    });

};

// Admin - Add Post

exports.PostAdd = function(request, response){

    Authenticate(request, response);
    
    Model.CategoryModel.find({}, function(error, result){
	
	if(error) {
	    Validation.ErrorRedirect(response, '/admin/posts', 'categoriesNotFoundError');  
	}
	response.pageInfo.title = 'Add New Post';
	response.pageInfo.layout = defaultLayout;
	response.pageInfo.userInfo.name = request.session.username;
	response.pageInfo.categories = result;
	response.render('admin/PostAdd', response.pageInfo);
	
    });
    

    
};

// Admin - Create Post

exports.PostCreate = function(request, response){
    
    Authenticate(request, response);
    
    var errors = false;
    var title = request.body.title;
    var date = request.body.date;
    var slug = request.body.slug;
    var category = request.body.category;    
    var content = request.body.content;
    
    var postTime;
    
    if(Validation.IsNullOrEmpty([title, date, slug, content])) {
	errors = true;
    }
    
    if(!Validation.ValidateDate(date)) {
	errors = true;
    }    
    
    if(errors)
	Validation.ErrorRedirect(response, '/admin/posts', 'postCreateError');   
    else {
	
	postTime = new Date(date);
	
	var p = new Model.PostModel({ 
	    title: title,
	    date: postTime,
	    slug: slug,
	    category:category,
	    content: content,
	    updated: Date.now()
	});

	p.save(function(error){

	    if(error) {
		Validation.ErrorRedirect(response, '/admin/posts', 'postCreateError');
	    }
	    else {
		Validation.SuccessRedirect(response, '/admin/posts', 'postCreated');
	    }
	});	
    }
};

// Admin - Edit Post

exports.PostEdit = function(request, response){

    Authenticate(request, response);
    var id = request.params.id;
    
    Model.PostModel.findOne({ _id: id }).populate('category').exec(function(error, result){
	
	if(error) {
	    Validation.ErrorRedirect(response, '/admin/posts', 'postNotFound'); 
	}
	else {

	    var postID = result._id;
	    var postTitle = result.title;
	    var formattedDate = Helpers.GetFormattedDate(result.date);
	    var postSlug = result.slug;
	    var postCategory = result.category;
	    var postContent = result.content;
	    
	    Model.CategoryModel.find({}, function(error, result){

		if(error) {
		    Validation.ErrorRedirect(response, '/admin/posts', 'categoriesNotFoundError');  
		}
		response.pageInfo.title = 'Edit Post: ' + postTitle;
		response.pageInfo.layout = defaultLayout;
		response.pageInfo.userInfo.name = request.session.username;
		response.pageInfo.categories = result;
		response.pageInfo.post = {
		    id: postID,
		    title: postTitle,
		    date: formattedDate,
		    category: postCategory,
		    slug: postSlug,
		    content: postContent
		};	
		response.render('admin/PostEdit', response.pageInfo);	

	    });	    
    
	}
	
    });
    
};


// Admin - Update Post

exports.PostUpdate = function(request, response){

    Authenticate(request, response);
    
    var errors = false;
    
    var title = request.body.title;
    var date = request.body.date;
    var slug = request.body.slug;
    var category = request.body.category;
    var content = request.body.content;
    var postTime;
    
    if(Validation.IsNullOrEmpty([title, date, slug, content])){
	errors = true;
    }

    if(!Validation.ValidateDate(date)) {
	errors = true;
    }
    
    if(errors)
	Validation.ErrorRedirect(response, '/admin/posts', 'postUpdateError');   
    else {
	
	postTime = new Date(date);
	
	Model.PostModel.update(
	    { _id: request.body.id }, 
	    {
		title: title,
		date: date,
		slug: slug,
		category:category,		
		content: content,
		updated: Date.now()
	    },
	    { multi: true }, 
	    function(error, result){
		if(error) {
		    Validation.ErrorRedirect(response, '/admin/posts', 'postUpdateError');
		}
		else{
		    Validation.SuccessRedirect(response, '/admin/posts', 'postUpdated');
		}
		    
	    }
	);	
    }
};

// Admin - Delete Post

exports.PostDelete = function(request, response){

    Authenticate(request, response);

    Model.PostModel.remove({ _id: request.params.id }, function(error, result) {
	if(error) {
	    Validation.ErrorRedirect(response, '/admin/posts', 'postDeleteError');
	}
	else{
	    Validation.SuccessRedirect(response, '/admin/posts', 'postDeleted');
	}
    });
};

// Admin - View All Menus

exports.MenusViewAll = function(request, response){ 
    
    Authenticate(request, response);    
    
    Model.MenuModel.find(function(error, result){
	
	if (error) {
	    Validation.ErrorRedirect(response, '/admin', 'menusNotFound');
	}	
	
	response.pageInfo.title = 'Menus';
	response.pageInfo.layout = defaultLayout;
	response.pageInfo.userInfo.name = request.session.username;    	
	response.pageInfo.menus = result;  
	response.render('admin/MenusViewAll', response.pageInfo);
	
    });
    
};

// Admin - Add Menu

exports.MenuAdd = function(request, response){ 

    Authenticate(request, response);
    response.pageInfo.title = 'Add New Menu';
    response.pageInfo.layout = defaultLayout;
    response.pageInfo.userInfo.name = request.session.username;
    response.render('admin/MenuAdd', response.pageInfo);
};


// Admin - Create Menu

exports.MenuCreate = function(request, response){ };

// Admin - Edit Menu

exports.MenuEdit = function(request, response){ 

    Authenticate(request, response);
    response.pageInfo.title = 'Edit Menu';
    response.pageInfo.layout = defaultLayout;
    response.pageInfo.userInfo.name = request.session.username;
    response.render('admin/MenuEdit', response.pageInfo);

};

// Admin - Update Menu

exports.MenuUpdate = function(request, response){ };

// Admin - Delete Menu

exports.MenuDelete = function(request, response){ };

// Admin - View All Categories

exports.CategoriesViewAll = function(request, response){

    Authenticate(request, response);

    Model.CategoryModel.find(function(error, result){
	
	if (error) {
	    Validation.ErrorRedirect(response, '/admin', 'categoriesNotFound');
	}	
	
	response.pageInfo.title = 'Categories';
	response.pageInfo.layout = defaultLayout;
	response.pageInfo.userInfo.name = request.session.username;    	
	response.pageInfo.categories = result;  
	response.render('admin/CategoriesViewAll', response.pageInfo);
	
    });

};



// Admin - Add Category

exports.CategoryAdd = function(request, response){

    Authenticate(request, response);
    response.pageInfo.title = 'Add New Category';
    response.pageInfo.layout = defaultLayout;
    response.pageInfo.userInfo.name = request.session.username;
    response.render('admin/CategoryAdd', response.pageInfo);
    
};

// Admin - Create Category

exports.CategoryCreate = function(request, response){
    
    Authenticate(request, response);
    
    var errors = false;
    var name = request.body.name;
    var slug = request.body.slug;
    
    if(Validation.IsNullOrEmpty([name, slug])) {
	errors = true;
    }  
    
    if(errors)
	Validation.ErrorRedirect(response, '/admin/categories', 'categoryCreateError');   
    else {
	
	var c = new Model.CategoryModel({ 
	    name: name,
	    slug: slug,
	    isDefault: false
	});

	c.save(function(error){

	    if(error) {
		Validation.ErrorRedirect(response, '/admin/categories', 'categoryCreateError');
	    }
	    else {
		Validation.SuccessRedirect(response, '/admin/categories', 'categoryCreated');
	    }
	});	
    }
};

// Admin - Edit Category

exports.CategoryEdit = function(request, response){

    Authenticate(request, response);
    var id = request.params.id;
    
    Model.CategoryModel.findOne({ _id: id, isDefault: false }, function(error, result){
	if(error) {
	    Validation.ErrorRedirect(response, '/admin/categories', 'categoryNotFound'); 
	}
	else {
	    
	    response.pageInfo.title = 'Edit Category';
	    response.pageInfo.layout = defaultLayout;
	    response.pageInfo.userInfo.name = request.session.username;
	    response.pageInfo.category = {
		id: result._id,
		name: result.name,
		slug: result.slug
	    };	
	    response.render('admin/CategoryEdit', response.pageInfo);	    
	}
	
    });
    
};

// Admin - Update Category

exports.CategoryUpdate = function(request, response){

    Authenticate(request, response);
    
    var errors = false;
    
    var name = request.body.name;
    var slug = request.body.slug;
    
    if(Validation.IsNullOrEmpty([name, slug])){
	errors = true;
    }
    
    if(errors)
	Validation.ErrorRedirect(response, '/admin/categories', 'categoryUpdateError');   
    else {
	
	Model.CategoryModel.update(
	    { _id: request.body.id }, 
	    {
		name: name,
		slug: slug
	    },
	    { multi: true }, 
	    function(error, result){
		if(error) {
		    Validation.ErrorRedirect(response, '/admin/categories', 'categoryUpdateError');
		}
		else{
		    Validation.SuccessRedirect(response, '/admin/categories', 'categoryUpdated');
		}
		    
	    }
	);	
    }
};

// Admin - Delete Category

exports.CategoryDelete = function(request, response){

    Authenticate(request, response);

    Model.CategoryModel.remove({ _id: request.params.id, isDefault: false }, function(error, result) {
	if(error) {
	    Validation.ErrorRedirect(response, '/admin/categories', 'categoryDeleteError');
	}
	else{
	    Validation.SuccessRedirect(response, '/admin/categories', 'categoryDeleted');
	}
    });
};

// Admin - View All SigUps

exports.SignUpsViewAll = function(request, response){

    Authenticate(request, response);

    Model.SignUpModel.find(function(error, result){
	
	if(error) {
	    Validation.ErrorRedirect(response, '/admin', 'signupsNotFound');
	}	
	else {
	    response.pageInfo.title = 'View All Sign Ups';
	    response.pageInfo.layout = defaultLayout;
	    response.pageInfo.userInfo.name = request.session.username;
	    response.pageInfo.signups =  result;
	    response.render('admin/SignUpsViewAll', response.pageInfo);
	}
    });

};