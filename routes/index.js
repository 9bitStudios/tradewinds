var db = require('../database');

exports.main = {
    
    index: function(request, response){
	response.render('index', { title: 'Hello World' });
    },

    other: function(request, response){
	response.render('other', { title: 'Other' });
    }
    
}

exports.admin = {
    
    index: function(request, response){
	response.render('index', { title: 'Admin' });
    }

}

