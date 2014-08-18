exports.AuthenticateAdmin = function(request, response) {
    if(!request.session.userid || !request.session.username || !request.session.admin) {
        response.redirect('/admin/login');
    }
};

exports.AuthenticateUser = function(request, response) {
    if(!request.session.userid || !request.session.username) {
        response.redirect('//login');
    }
};