exports.index = function(request, response){
    response.render('index', { title: 'Hello World' });
}

exports.other = function(request, response){
    response.render('other', { title: 'Other' });
}