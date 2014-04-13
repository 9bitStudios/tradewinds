var UserModel = require('../models/users');

exports.index = function(request, response){

    response.render('admin/index', { title: 'Administration Panel' });
}

exports.debug = function(request, response){

    var users;

    UserModel.find(function(err, result){
	users = result;

	response.render('admin/debug', { 
	    title: 'Debug',
	    users: users		
	});		

    });

}