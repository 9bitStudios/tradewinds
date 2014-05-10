var config = require('../config');
var emailServer = require('emailjs');
var Helpers = require('../helpers/Helpers');
var Validation = require('../helpers/Validation');
var Model = require('../models/Models');
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');

function Authenticate(request, response) {
    if(!request.session.userid || !request.session.username) {
	response.redirect('/profile/login');
    }
}

// Profile

exports.Login = function(request, response){

    if(request.session.username)
	response.redirect('/profile/dashboard');
    
    response.render('profile/Login', { 
	title: 'Login'
    });

};

exports.Logout = function(request, response){
    request.session.destroy();
    response.redirect('/profile/login');
};

exports.AuthenticateProfile = function(request, response){

    Model.UserModel.findOne({ 'name': request.body.username, isDefault: false }, 'name password', function(error, user){
	if (error){
	    response.redirect('/profile/login?error=true');
	}
	
	// user found
	if(user) {
	    // compare passwords
	    if(bcrypt.compareSync(request.body.password, user.password)) {
		request.session.userid = user._id;
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
    
};

exports.Dashboard = function(request, response){

    Authenticate(request, response);

    response.render('profile/Dashboard', { 
	title: 'Dashboard',
	userInfo: {
	    name: request.session.username
	}
    });

};

exports.ProfileEdit = function(request, response){

    Authenticate(request, response);
    
    var profileID = request.session.userid;
    var name = request.session.username;

    // get guer info based on current session
    Model.UserModel.findOne({ _id: profileID, name: name }, function(error, result){
	if(error) {
	    response.redirect('/profile/dashboard?error=true');
	}
	else {
	    
	    if(result) {
		response.render('profile/DashboardEditProfile', { 
		    title: 'Edit Your Profile',
		    user: {
			id: profileID,
			avatar: result.avatar
		    }		
		});	
	    }
	    else {
		response.redirect('/profile/dashboard?error=true');
	    }
	}
    });

};

exports.ProfileUpdate = function(request, response){

    Authenticate(request, response);
    
    var errors = false;
    var profileID = request.session.id;
    var avatar = request.body.avatar;
    
    if(Validation.IsNullOrEmpty(avatar))
	errors = true;
    
    if(errors)
	response.redirect('/profile/dashboard?error=true');    
    else {
	
	if(request.files.profileImage.name === '') {
	    response.redirect('/profile/dashboard?updated=false');
	}
	else {
	    var profileImage = request.files.profileImage;
	    var tempPath = profileImage.path;
	    var newImage = profileID + Helpers.GetFileExtension(profileImage.name);
	    profileImage.name = newImage;
	    var targetPath = './public/images/' + profileImage.name;

	    fs.rename(tempPath, targetPath, function(error) {

		if (error) { 
		    response.redirect('/profile/dashboard?error=true');  
		}

		// Delete the temporary file
		fs.unlink(tempPath, function() {

		    if (error) { 
			response.redirect('/profile/dashboard?error=true');    
		    }
		    else {

			Model.UserModel.update(
			    { _id: request.body.id }, 
			    {
				avatar: newImage,
			    },
			    { multi: true }, 
			    function(error, result){
				response.redirect('/profile/dashboard');
			    }
			);
		    }
		});
	    });
	}
	    
    }
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

		s.save(function(error, result){

		    if(error)
			response.redirect('/signup?error=true');
		    else {
			
			emailServer.server.connect({
			    user: config[config.environment].smtp.username,
			    password: config[config.environment].smtp.password,
			    host: config[config.environment].smtp.host,
			    port: config[config.environment].smtp.port,
			    ssl: config[config.environment].smtp.ssl
			}).send({
			    text: 'Please confirm your sign up by going to this link: http:localhost:1337/signup/confirm/'+result._id, 
			    from: 'Tradewinds <no-reply@tradewinds.com>', 
			    to: name + ' <'+ email +'>',
			    subject: 'Please confirm your sign up'
			}, function(error, message) { 
			    if(error) 
				response.redirect('/signup?error=true');
			    else
				response.redirect('/signup/checkemail');
			});			
			
		    }
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
		    isAdmin: false,
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

