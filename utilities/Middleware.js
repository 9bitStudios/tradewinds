exports.AppendPageInfo = function(request, response, next) {
    
    response.pageInfo = {
	title: '',
	userInfo:{
	    name: null
	},
	notifications: {
	    success: [],
	    error: []
	}
    };
    
    next();
}

exports.AppendNotifications = function(request, response, next) {
    
    if(request.param('success')) {
	// Get Message and append to response object
	response.pageInfo.notifications.success.push('Success');
    }
    else if (request.param('error')){
	// Get Message and append to response object
	response.pageInfo.notifications.error.push('Error');
    }
    
    next();
    
}