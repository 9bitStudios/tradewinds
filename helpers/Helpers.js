exports.RandomString = function(strLength) {
    if(typeof strLength === 'undefined') 
	    strLength = 8;

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < strLength; i++ )
	    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;		
}

exports.Authenticate = function(request, response) {
    
    if(!request.session.user) {
	response.redirect('/login');
    }
    
    
}