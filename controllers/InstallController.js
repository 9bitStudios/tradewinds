var Validation = require('../helpers/Validation');
var Model = require('../models/Models');
var bcrypt = require('bcrypt-nodejs');

exports.Index = function(request, response){
    
    Model.UserModel.findOne({ isDefault: true }, function(error, result){
	    	
	if(!result || error) {
	    response.render('admin/Install', { title: 'Install', installed: false });
	}
	else
	    response.redirect('/install/success');
    });    
    
    response.render('admin/Install', { title: 'Install' });
}

exports.InstallSuccess = function(request, response){
    response.render('admin/Install', { title: 'Install', installed: true });
}


exports.Install = function(request, response){
    
    var errors = false;
    
    var name = request.body.name;
    var email = request.body.email;
    var password = request.body.password;
    var password2 = request.body.password2;
    
    if(Validation.IsNullOrEmpty([name, email, password, password2]))
	errors = true;
    
    if(!Validation.ValidateEmail(email))
	errors = true;    
    
    if(!Validation.Equals(password, password2))
	errors = true;
    
    if(errors) {
	response.redirect('/install?error=true');
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

	u.save(function(error){

	    if(error)
		response.redirect('/install?error=true');
	    else
		response.redirect('/install?success=true');
	});   
    }
}

