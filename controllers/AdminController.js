var UserModel = require('../models/UserModel');
var defaultLayout = 'admin';

exports.index = function(request, response){

    response.render('admin/index', { 
	title: 'Administration Panel Home', 
	layout: defaultLayout  
    });
}

exports.debug = function(request, response){

    var users;

    UserModel.find(function(error, result){
	users = result;
	    	
	response.render('admin/debug', { 
	    title: 'Debug',
	    layout: defaultLayout,  
	    users: users		
	});
	
    });

}