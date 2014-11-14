exports.AuthenticateAdmin = function(request, response, next) {
    if(request.session.userid && request.session.username && request.session.admin) {
        return next();
    }
    else {
        response.redirect('/admin/login');
    }
};

exports.AuthenticateUser = function(request, response, next) {
    if(request.session.userid && request.session.username) {
        return next();
    }
    else {
        response.redirect('/profile/login');
    }
};