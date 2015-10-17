exports.AuthenticateAdmin = function(request, response, next) {
    if(request.session.userid && request.session.username && request.session.admin) {
        return next();
    }
    else {
        response.redirect('/admin/login');
    }
};