var config = require('../config');
var mongoose = require('mongoose');
var configEnvironment = config.environment;
var connectionString = 'mongodb://' + config[configEnvironment].database.credentials + config[configEnvironment].database.host + ':' + config[configEnvironment].database.port  + '/'+ config[configEnvironment].database.name;
var db = mongoose.connection;

db.on('error', function(){
    console.log('There was an error connecting to the database');
});

db.once('open', function() {
    console.log('Successfully connected to database');
});

// Database
mongoose.connect(connectionString);

//Schemas
var User = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    avatar: String,
    isDefault: Boolean
});

var Post = new mongoose.Schema({
    title: String,
});

//Models
var UserModel = mongoose.model('User', User );
var PostModel = mongoose.model('Post', Post );

module.exports = {
    UserModel: UserModel,
    PostModel: PostModel
}



    
    
