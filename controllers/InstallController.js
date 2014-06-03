var Validation = require('../utilities/Validation');
var Model = require('../models/Models');
var bcrypt = require('bcrypt-nodejs');

exports.Index = function(request, response){
    
    Model.UserModel.findOne({ isDefault: true }, function(error, result){
	    	
	if(!result || error) {
	    response.pageInfo.title = 'Install';
	    response.pageInfo.installed = false;
	    response.render('admin/Install', response.pageInfo);
	}
	else {
	    response.redirect('/install/success');
	}
    });    

};

exports.InstallSuccess = function(request, response){
    response.pageInfo.title = 'Install';
    response.pageInfo.installed = true;
    response.render('admin/Install', response.pageInfo);
};


exports.Install = function(request, response){
    
    var errors = false;
    
    var name = request.body.name;
    var email = request.body.email;
    var password = request.body.password;
    var password2 = request.body.password2;
    
    if(Validation.IsNullOrEmpty([name, email, password, password2])) {
	errors = true;
    }
    
    if(!Validation.ValidateEmail(email)) {
	errors = true;    
    }
    
    if(!Validation.Equals(password, password2)) {
	errors = true;
    }
    
    if(errors) {
	Validation.ErrorRedirect(response, '/install', 'installError'); 
    }
    else {
	var salt = bcrypt.genSaltSync(10);
	var passwordHash = bcrypt.hashSync(request.body.password, salt);

	var u = new Model.UserModel({ 
	    name: request.body.name,
	    password: passwordHash,
	    email: request.body.email,
	    avatar: 'placeholder.png',
	    isAdmin: true,
	    isDefault: true
	});


	var c = new Model.CategoryModel({
	    name: "--",
	    slug: "",
	    isDefault: true
	});

	u.save(function(error){

	    if(error) {
		Validation.ErrorRedirect(response, '/install', 'installError'); 
	    }
	    else {
		c.save(function(error){
		    
		    if(error) {
			Validation.ErrorRedirect(response, '/install', 'installError'); 
		    }		    
		    
		    Validation.SuccessRedirect(response, '/install', 'installSuccess'); 
		});
	    }
	});   
    }
};

