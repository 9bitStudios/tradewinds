exports.Index = function(request, response){
    response.render('admin/Install', { title: 'Install', layout:'admin' });
}

exports.Install = function(request, response){
    response.redirect('/install?success=true');
}

