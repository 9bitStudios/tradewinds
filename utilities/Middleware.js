var Notifications = require('./Notifications');


exports.AppendPageInfo = function(request, response, next) {
    
    response.pageInfo = {
	title: '',
	menus: { },
	userInfo:{
	    name: null
	},
	notifications: {
	    success: null,
	    error: null
	}
    };
    
    next();
};

exports.AppendNotifications = function(request, response, next) {
    
    if(request.param('success')) {
	response.pageInfo.notifications.success = Notifications.GetNotification('success', request.param('message'));
    }
    else if (request.param('error')){
	response.pageInfo.notifications.error = Notifications.GetNotification('error', request.param('message'));
    }
    
    next();
    
};

exports.CSRFToken = function(request, response, next) {
    response.locals.csrftoken = request.csrfToken();
    next();
};