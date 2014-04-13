var mongoose = require('mongoose');

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




    
    
