var Helpers = require('../helpers/Helpers');
var Validation = require('../helpers/Validation');
var Model = require('../models/Models');
var bcrypt = require('bcrypt-nodejs');

function Authenticate(request, response) {
    if(!request.session.username) {
	response.redirect('/profile/login');
    }
}

// Profile

exports.Login = function(request, response){

    response.render('profile/Login', { 
	title: 'Login'
    });

};

exports.Logout = function(request, response){
    request.session.destroy();
    response.redirect('/profile/login');
}

exports.AuthenticateProfile = function(request, response){

    Model.UserModel.findOne({ 'name': request.body.username, isDefault: false }, 'name password', function(error, user){
	if (error){
	    response.redirect('/profile/login?error=true');
	}
	
	// user found
	if(user) {
	    // compare passwords
	    if(bcrypt.compareSync(request.body.password, user.password)) {
		request.session.username = user.name;
		response.redirect('/profile/dashboard');
	    }
	    else
		response.redirect('/profile/login?error=true');
	}
	else {
	    response.redirect('/profile/login?error=true');
	}
	
    });
    
}

exports.Dashboard = function(request, response){

    Authenticate(request, response);

    response.render('profile/Dashboard', { 
	title: 'Dashboard',
	userInfo: {
	    name: request.session.username
	}
    });

};

exports.SignUp = function(request, response){

    response.render('profile/SignUp', { 
	title: 'Sign Up'
    });

};

exports.SignUpAdd = function(request, response){
    
    var errors = false;
    
    var name = request.body.name;
    var email = request.body.email;
    var password = request.body.password;
    var password2 = request.body.password2;
    
    if(Validation.IsNullOrEmpty([name, email, password, password2]))
	errors = true;
    if(!Validation.Equals(password, password2))
	errors = true;    
    if(!Validation.ValidateEmail(email))
	errors = true;
    
    if(errors)
	response.redirect('/signup?error=true');    
    else {
	
	Model.UserModel.findOne({ email: email }, function(error, result){

	    // user email already exists
	    if(result){
		response.redirect('/signup?error=true&message=exists');
	    }
	    else {
		
		var salt = bcrypt.genSaltSync(10);
		var passwordHash = bcrypt.hashSync(password, salt);

		var s = new Model.SignUpModel({
		    name: name,
		    password: passwordHash,
		    email: email,
		    date: Date.now()
		});

		s.save(function(error){

		    if(error)
			response.redirect('/signup?error=true');
		    else
			response.redirect('/signup/checkemail');
		});		
	    }

	});	

    }
};

exports.CheckEmail = function(request, response){

    response.render('profile/SignUpCheckEmail', { 
	title: 'Thank You'
    });

};

exports.SignUpConfirm = function(request, response){

    var id = request.params.id;
    
    Model.SignUpModel.findOne({ _id: id }, function(error, result){

	if(error) {
	    response.redirect('/signup/invalid');
	}
	else {
	    
	    if(result) {
		// remove sign up
		result.remove();

		var u = new Model.UserModel({ 
		    name: result.name,
		    password: result.password,
		    email: result.email,
		    avatar: 'placeholder.png',
		    isDefault: false
		});

		u.save(function(error){
		    if(error) {
			response.redirect('/signup/invalid');
		    }
		    else {
			response.redirect('/signup/thanks');
		    }
		});	
	    }
	    else {
		response.redirect('/signup/invalid');
	    }
		
	}
	
    });

};

exports.SignUpThanks = function(request, response){

    response.render('profile/SignUpThanks', { 
	title: 'Thank You'
    });

};

exports.SignUpInvalid = function(request, response){

    response.render('profile/SignUpInvalid', { 
	title: 'Invalid Token'
    });

};

