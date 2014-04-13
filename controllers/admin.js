var UserModel = require('../models/users');

exports.index = function(request, response){
    response.render('index', { title: 'Admin' });
}