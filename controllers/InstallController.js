var Model = require('../models/Models');
var bcrypt = require('bcrypt-nodejs');

exports.Index = function(request, response){
    response.render('admin/Install', { title: 'Install' });
}

exports.Install = function(request, response){
    
    var salt = bcrypt.genSaltSync(10);
    var passwordHash = bcrypt.hashSync(request.body.password, salt);
    
    var u = new Model.UserModel({ 
	name: request.body.name,
	password: passwordHash,
	email: request.body.email,
	avatar: 'placeholder.png',
	isDefault: true
    });
    
    u.save(function(error){
	
	if(error)
	    response.redirect('/install?error=true');
	else
	    response.redirect('/install?success=true');
    });   
}

