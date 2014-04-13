var UserModel = require('../models/users');

exports.index = function(request, response){

	UserModel.find(function(err, result){
		console.log(result);
	});
    response.render('index', { title: 'Admin' });
}