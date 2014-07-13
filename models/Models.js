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

var Menu = new mongoose.Schema({
    name: String,
    data: mongoose.Schema.Types.Mixed
});

var Post = new mongoose.Schema({
    title: String,
    date: Date,
    slug: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    path: String,
    content: String,
    updated: Date
});

var SignUp = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    date: Date
});

var Category = new mongoose.Schema({
    name: String,
    slug: String,
    isDefault: Boolean
});

//Models
var UserModel = mongoose.model('User', User );
var PostModel = mongoose.model('Post', Post );
var MenuModel = mongoose.model('Menu', Menu );
var CategoryModel = mongoose.model('Category', Category );
var SignUpModel = mongoose.model('SignUp', SignUp );

module.exports = {
    UserModel: UserModel,
    PostModel: PostModel,
    MenuModel: MenuModel,
    CategoryModel: CategoryModel,    
    SignUpModel: SignUpModel 
};



    
    
