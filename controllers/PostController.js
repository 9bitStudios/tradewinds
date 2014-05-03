var Helpers = require('../helpers/Helpers');
var Validation = require('../helpers/Validation');
var Model = require('../models/Models');
var bcrypt = require('bcrypt-nodejs');

// Admin - Home

exports.Process = function(request, response, next){

    var slug = request.url.substring(1);
    
    Model.PostModel.findOne({ slug: slug }, function(error, result){
	
	if(result) {
	    response.render('home/Post', { 
		title: result.title,
		content: result.content 		
	    });
	}
	else {
	    next();
	}
    });
    
};

