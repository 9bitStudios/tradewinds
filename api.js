module.exports = function(express, server, mongoose, database) {   

    server.get('/myroute', function(req,res) {
	
	return database.UserModel.find(function(error, users) {
	    
	    if(!error) {
		return res.send(users);
	    } 
	    else {
		return console.log(error);
	    }	
	});
	
    });
    
    server.use(function(request, response){
	response.send(404, 'Route Not Found');
    }); 
    
};