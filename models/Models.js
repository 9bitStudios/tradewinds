var mongoose = require('mongoose');
var db = mongoose.connection;

db.on('error', function(){
    console.log('There was an error connecting to the database');
});

db.once('open', function() {
    console.log('Successfully connected to database');
});

// Database
mongoose.connect('mongodb://localhost/tradewinds');

//Schemas
var User = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    avatar: String,
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



    
    
