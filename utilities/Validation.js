exports.SuccessRedirect = function(response, route, message) {
    
    if(typeof message !== 'undefined')
	response.redirect(route + '?success=true&message=' + message)
    else
	response.redirect(route + '?success=true')
}

exports.ErrorRedirect = function(response, route, message) {
    
    if(typeof message !== 'undefined')
	response.redirect(route + '?error=true&message=' + message)
    else
	response.redirect(route + '?error=true')
}

exports.IsNullOrEmpty = function(check){
    
    var errors = false;
    
    if(Object.prototype.toString.call(check) == '[object Array]') {
	
	for(var i=0; i < check.length; i++){
	    
	    if(!check[i]) {
		errors = true;
	    }
	    if(check[i].trim() == '') {
		errors = true;
	    }
	}
	
    }
    else if(typeof check === 'string') {
	if(!check)
	    errors = true;
	if(check.trim() == '')
	    errors = true;
    }
    
    return errors;
    
}

exports.Equals = function(one, two) {
    if(one === two)
	return true;
    else
	return false;
}

exports.ValidateEmail = function(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 