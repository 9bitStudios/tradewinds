exports.index = function(request, response){
    response.render('admin/install', { title: 'Install', layout:'admin' });
}

exports.install = function(request, response){
    console.log(request.body.sample);
    response.redirect('/install?success=true');
}

