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

//Schema
var User = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,
});

//Model
module.exports = mongoose.model('User', User );




    
    
