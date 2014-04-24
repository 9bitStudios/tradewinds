var UserModel = require('../models/UserModel');
var defaultLayout = 'admin';

exports.Index = function(request, response){

    response.render('admin/Index', { 
	title: 'Administration Panel Home', 
	layout: defaultLayout  
    });
}

exports.AddUser = function(request, response){

    response.render('admin/AddUser', { 
	title: 'Add User', 
	layout: defaultLayout  
    });
}

exports.CreateUser = function(request, response){
    
    var u = new UserModel({ 
	name: request.body.name,
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

exports.Debug = function(request, response){

    var users;

    UserModel.find(function(error, result){
	users = result;
	    	
	response.render('admin/Debug', { 
	    title: 'Debug',
	    layout: defaultLayout,  
	    users: users		
	});
	
    });

}