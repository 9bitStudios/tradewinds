var UserModel = require('../models/UserModel');
var bcrypt = require('bcrypt-nodejs');

exports.Index = function(request, response){

    response.render('login/Index', { 
	title: 'Login'
    });
}

exports.Authenticate = function(request, response){

    UserModel.findOne({ 'name': request.body.username }, 'name password', function(error, user){
	if (error){
	    response.redirect('/login?error=true');
	}
	
	// user found
	if(user) {
	    // compare passwords
	    if(bcrypt.compareSync(request.body.password, user.password))
		response.redirect('/admin');
	    else
		response.redirect('/login?error=true');
	}
	else {
	    response.redirect('/login?error=true');
	}
	
    });
    
}