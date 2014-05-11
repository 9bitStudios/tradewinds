var Helpers = require('../helpers/Helpers');
var Validation = require('../helpers/Validation');
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

    response.render('admin/Index', { 
	title: 'Administration Panel Home', 
	layout: defaultLayout,
	userInfo: {
	    name: request.session.username
	}
    });
};

exports.Login = function(request, response){

    if(request.session.user && request.session.admin)
	response.redirect('/admin');
    
    response.render('admin/Login', { 
	title: 'Login',
    });
}

exports.Logout = function(request, response){
    request.session.destroy();
    response.redirect('/admin/login')
}

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
    
}

// Admin - View All Users

exports.UsersViewAll = function(request, response){

    Authenticate(request, response);

    var users;

    Model.UserModel.find(function(error, result){
	users = result;
	    	
	response.render('admin/UsersViewAll', { 
	    title: 'View All Users',
	    layout: defaultLayout,  
	    userInfo: {
		name: request.session.username
	    },
	    users: users		
	});
	
    });

};

// Admin - Add User

exports.UserAdd = function(request, response){

    Authenticate(request, response);

    response.render('admin/UserAdd', { 
	title: 'Add User', 
	layout: defaultLayout,
	userInfo: {
	    name: request.session.username
	}
    });
};

// Admin - Create User

exports.UserCreate = function(request, response){
    
    Authenticate(request, response);
    
    var errors = false;
    
    var name = request.body.name;
    var email = request.body.email;
    var password = request.body.password;
    var password2 = request.body.password2;
    var avatar = request.body.avatar;
    
    if(Validation.IsNullOrEmpty([name, email, password, password2, avatar]))
	errors = true;
    if(!Validation.Equals(password, password2))
	errors = true;    
    if(!Validation.ValidateEmail(email))
	errors = true;
    
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
		    avatar: avatar,
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
	    	
	response.render('admin/UserEdit', { 
	    title: 'Edit User',
	    layout: defaultLayout,  
	    userInfo: {
		name: request.session.username
	    },
	    user: {
		id: result._id,
		name: result.name,
		email: result.email,
		avatar: result.avatar,
		isAdmin: result.isAdmin,		
		isDefault: result.isDefault
	    }		
	});
	
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
		if(error)
		    Validation.ErrorRedirect(response, '/admin/users', 'userUpdateError');
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

    var posts;

    Model.PostModel.find(function(error, result){
	posts = result;
	    	
	response.render('admin/PostsViewAll', { 
	    title: 'Posts',
	    layout: defaultLayout,  
	    userInfo: {
		name: request.session.username
	    },
	    posts: posts		
	});
	
    });

};

// Admin - Add Post

exports.PostAdd = function(request, response){

    Authenticate(request, response);

    response.render('admin/PostAdd', { 
	title: 'Add New Post', 
	layout: defaultLayout,
	userInfo: {
	    name: request.session.username
	}
    });
};

// Admin - Create Post

exports.PostCreate = function(request, response){
    
    Authenticate(request, response);
    
    var errors = false;
    
    var title = request.body.title;
    var slug = request.body.slug;
    var content = request.body.content;
    
    if(Validation.IsNullOrEmpty([title, slug, content]))
	errors = true;
    
    if(errors)
	Validation.ErrorRedirect(response, '/admin/posts', 'postCreateError');   
    else {
	
	var p = new Model.PostModel({ 
	    title: title,
	    slug: slug,
	    content: content
	});

	p.save(function(error){

	    if(error)
		Validation.ErrorRedirect(response, '/admin/posts', 'postCreateError');
	    else
		Validation.SuccessRedirect(response, '/admin/posts', 'postCreated');
	});	
    }
};

// Admin - Edit Post

exports.PostEdit = function(request, response){

    Authenticate(request, response);
    var id = request.params.id;
    
    Model.PostModel.findOne({ _id: id }, function(error, result){
	if(error) {
	    Validation.ErrorRedirect(response, '/admin/posts', 'postNotFound'); 
	}
	else {
	    response.render('admin/PostEdit', { 
		title: 'Edit Post',
		layout: defaultLayout,  
		userInfo: {
		    name: request.session.username
		},
		post: {
		    id: result._id,
		    title: result.title,
		    slug: result.slug,
		    content: result.content
		}		
	    });
	}
	
    });
    
};


// Admin - Update Post

exports.PostUpdate = function(request, response){

    Authenticate(request, response);
    
    var errors = false;
    
    var title = request.body.title;
    var slug = request.body.slug;
    var content = request.body.content;
    
    if(Validation.IsNullOrEmpty([title, slug, content]))
	errors = true;

    if(errors)
	Validation.ErrorRedirect(response, '/admin/posts', 'postUpdateError');   
    else {
	
	Model.PostModel.update(
	    { _id: request.body.id }, 
	    {
		title: title,
		slug: slug,
		content: content
	    },
	    { multi: true }, 
	    function(error, result){
		if(error) {
		    Validation.ErrorRedirect(response, '/admin/posts', 'postUpdateError')
		}
		else{
		    Validation.SuccessRedirect(response, '/admin/posts', 'postUpdated')
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
	    Validation.ErrorRedirect(response, '/admin/posts', 'postDeleteError')
	}
	else{
	    Validation.SuccessRedirect(response, '/admin/posts', 'postDeleted')
	}
    });
};

// Admin - View All SigUps

exports.SignUpsViewAll = function(request, response){

    Authenticate(request, response);

    var signups;

    Model.SignUpModel.find(function(error, result){
	signups = result;
	    	
	response.render('admin/SignUpsViewAll', { 
	    title: 'View All Sign Ups',
	    layout: defaultLayout,  
	    userInfo: {
		name: request.session.username
	    },
	    signups: signups		
	});
	
    });

};