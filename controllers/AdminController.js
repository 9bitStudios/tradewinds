var Helpers = require('../helpers/Helpers');
var UserModel = require('../models/UserModel');
var bcrypt = require('bcrypt-nodejs');
var defaultLayout = 'admin';

function Authenticate(request, response) {
    if(!request.session.username) {
	response.redirect('/login');
    }
}

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

exports.ViewAllUsers = function(request, response){

    Authenticate(request, response);

    var users;

    UserModel.find(function(error, result){
	users = result;
	    	
	response.render('admin/ViewAllUsers', { 
	    title: 'View All Users',
	    layout: defaultLayout,  
	    userInfo: {
		name: request.session.username
	    },
	    users: users		
	});
	
    });

}

exports.AddUser = function(request, response){

    Authenticate(request, response);

    response.render('admin/AddUser', { 
	title: 'Add User', 
	layout: defaultLayout,
	userInfo: {
	    name: request.session.username
	}
    });
}

exports.CreateUser = function(request, response){
    
    Authenticate(request, response);
    
    var salt = bcrypt.genSaltSync(10);
    var passwordHash = bcrypt.hashSync(request.body.password, salt);
    
    var u = new UserModel({ 
	name: request.body.name,
	password: passwordHash,
	email: request.body.email,
	avatar: request.body.avatar
    });
    
    u.save(function(error){
	
	if(error)
	    response.redirect('/admin?error=true');
	else
	    response.redirect('/admin?success=true');
    });   
}