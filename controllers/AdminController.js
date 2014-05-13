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
	}
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
    response.pageInfo.title = 'Add New Post';
    response.pageInfo.layout = defaultLayout;
    response.pageInfo.userInfo.name = request.session.username;
    response.render('admin/PostAdd', response.pageInfo);
    
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
    
    Model.PostModel.findOne({ _id: id }, function(error, result){
	if(error) {
	    Validation.ErrorRedirect(response, '/admin/posts', 'postNotFound'); 
	}
	else {
	    
	    response.pageInfo.title = 'Edit Post';
	    response.pageInfo.layout = defaultLayout;
	    response.pageInfo.userInfo.name = request.session.username;
	    response.pageInfo.post = {
		id: result._id,
		title: result.title,
		slug: result.slug,
		content: result.content
	    };	
	    response.render('admin/PostEdit', response.pageInfo);	    
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

    Model.SignUpModel.find(function(error, result){
	
	if(error) {
	    Validation.ErrorRedirect(response, '/admin', 'signupsNotFound')
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