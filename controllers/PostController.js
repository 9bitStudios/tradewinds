var Helpers = require('../utilities/Helpers');
var Validation = require('../utilities/Validation');
var Model = require('../models/Models');
var bcrypt = require('bcrypt-nodejs');

// Posts - Process

exports.Process = function(request, response, next){

    var path = request.url.substring(1);
    
    Model.PostModel.findOne({ path: path }).exec(function(error, result){
	
	if(error) {
	    next();
	}
	else {
	    if(result) {
			response.pageInfo.title = result.title;
			response.pageInfo.content = result.content;               
	    }
	    else {
			next();
	    }
	}
    }).then(Model.MenuModel.find({}).exec(function(error, result){

        if(result) {
            response.pageInfo.menus = Helpers.GetMenus(result);
            response.render('home/Post', response.pageInfo);
        }
        else {
            response.render('home/Post', response.pageInfo);
        }
        
    }));
    
};

