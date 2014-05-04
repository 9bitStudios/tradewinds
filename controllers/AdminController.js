var Helpers = require('../helpers/Helpers');
var Validation = require('../helpers/Validation');
var Model = require('../models/Models');
var bcrypt = require('bcrypt-nodejs');
var defaultLayout = 'admin';

function Authenticate(request, response) {
    if(!request.session.username) {
	response.redirect('/login');
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
	response.redirect('/admin/users?error=true');    
    else {
	
	Model.UserModel.findOne({ email: email }, function(error, result){

	    // user email already exists
	    if(result){
		response.redirect('/admin/users?error=true&message=exists');
	    }
	    else {
		
		var salt = bcrypt.genSaltSync(10);
		var passwordHash = bcrypt.hashSync(password, salt);

		var u = new Model.UserModel({ 
		    name: name,
		    password: passwordHash,
		    email: email,
		    avatar: avatar,
		    isDefault: false
		});

		u.save(function(error){

		    if(error)
			response.redirect('/admin/users?error=true');
		    else
			response.redirect('/admin/users?success=true');
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
		avatar: result.avatar
	    }		
	});
	
    });
    
};

// Admin - Update User

exports.UserUpdate = function(request, response){

    Authenticate(request, response);
    
    var errors = false;
    
    var name = request.body.name;
    var email = request.body.email;
    var avatar = request.body.avatar;
    
    if(Validation.IsNullOrEmpty([name, email, avatar]))
	errors = true;
    if(!Validation.ValidateEmail(email))
	errors = true;

    if(errors)
	response.redirect('/admin/users?error=true');    
    else {
	
	Model.UserModel.update(
	    { _id: request.body.id }, 
	    {
		name: name,
		email: email,
		avatar: avatar
	    },
	    { multi: true }, 
	    function(error, result){
		response.redirect('/admin/users');
	    }
	);	
    }
};

// Admin - Delete User

exports.UserDelete = function(request, response){

    Authenticate(request, response);

    Model.UserModel.remove({ _id: request.params.id, isDefault: false }, function(error, result) {
	if (!error) {
	    response.redirect('/admin/users');
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
	response.redirect('/admin/posts?error=true');    
    else {
	
	var p = new Model.PostModel({ 
	    title: title,
	    slug: slug,
	    content: content
	});

	p.save(function(error){

	    if(error)
		response.redirect('/admin/posts?error=true');
	    else
		response.redirect('/admin/posts?success=true');
	});	
    }
};

// Admin - Edit Post

exports.PostEdit = function(request, response){

    Authenticate(request, response);
    var id = request.params.id;
    
    Model.PostModel.findOne({ _id: id }, function(error, result){
	    	
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
	response.redirect('/admin/posts?error=true');    
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
		response.redirect('/admin/posts');
	    }
	);	
    }
};

// Admin - Delete Post

exports.PostDelete = function(request, response){

    Authenticate(request, response);

    Model.PostModel.remove({ _id: request.params.id }, function(error, result) {
	if (!error) {
	    response.redirect('/admin/posts');
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