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


exports.ValidateEmail = function(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 