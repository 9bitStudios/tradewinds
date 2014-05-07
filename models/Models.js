var config = require('../config');
var mongoose = require('mongoose');
var connectionString = 'mongodb://' + config[config.environment].database.credentials + config[config.environment].database.host + ':' + config[config.environment].database.port  + '/'+ config[config.environment].database.name;
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
    isAdmin: Boolean, 
    isDefault: Boolean
});

var Post = new mongoose.Schema({
    title: String,
    slug: String,
    content: String
});

var SignUp = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    date: Date
});

//Models
var UserModel = mongoose.model('User', User );
var PostModel = mongoose.model('Post', Post );
var SignUpModel = mongoose.model('SignUp', SignUp );

module.exports = {
    UserModel: UserModel,
    PostModel: PostModel,
    SignUpModel: SignUpModel 
}



    
    
