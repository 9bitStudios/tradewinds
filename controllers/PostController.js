var Helpers = require('../utilities/Helpers');
var Validation = require('../utilities/Validation');
var Model = require('../models/Models');
var bcrypt = require('bcrypt-nodejs');

// Posts - Process

exports.Process = function(request, response, next){

    var slug = request.url.substring(1);
    
    Model.PostModel.findOne({ slug: slug }, function(error, result){
	
	if(error) {
	    next();
	}
	else {
	    if(result) {
		response.render('home/Post', { 
		    title: result.title,
		    content: result.content 		
		});
	    }
	    else {
		next();
	    }
	}
    });
    
};

