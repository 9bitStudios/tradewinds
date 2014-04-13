exports.index = function(request, response){
    response.render('home/index', { title: 'Hello World' });
}

exports.other = function(request, response){
    response.render('home/other', { title: 'Other' });
}