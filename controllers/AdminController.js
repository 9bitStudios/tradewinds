var Helpers = require('../helpers/Helpers');
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

}

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
}

// Admin - Create User

exports.UserCreate = function(request, response){
    
    Authenticate(request, response);
    
    var salt = bcrypt.genSaltSync(10);
    var passwordHash = bcrypt.hashSync(request.body.password, salt);
    
    var u = new Model.UserModel({ 
	name: request.body.name,
	password: passwordHash,
	email: request.body.email,
	avatar: request.body.avatar,
	isDefault: false
    });
    
    u.save(function(error){
	
	if(error)
	    response.redirect('/admin/users?error=true');
	else
	    response.redirect('/admin/users?success=true');
    });   
}

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
    
}

// Admin - Update User

exports.UserUpdate = function(request, response){

    Authenticate(request, response);

    Model.UserModel.update(
	{ _id: request.body.id }, 
	{
	    name: request.body.name,
	    email: request.body.email,
	    avatar: request.body.avatar
	},
	{ multi: true }, 
	function(error, result){
	    response.redirect('/admin/users');
	}
    );
}

// Admin - Delete User

exports.UserDelete = function(request, response){

    Authenticate(request, response);

    Model.UserModel.remove({ _id: request.params.id, isDefault: false }, function(error, result) {
	if (!error) {
	    response.redirect('/admin/users');
	}
    });
}

