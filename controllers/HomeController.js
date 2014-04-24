exports.Index = function(request, response){
    response.render('home/Index', { title: 'Hello World' });
}

exports.Other = function(request, response){
    response.render('home/Other', { title: 'Other' });
}