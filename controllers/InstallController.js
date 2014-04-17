exports.index = function(request, response){
    response.render('admin/install', { title: 'Hello World', layout:'admin' });
}

exports.install = function(request, response){
    console.log('Data was posted...');
    response.redirect('/install?success=true');
}

