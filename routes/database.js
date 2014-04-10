var mongoose = require('mongoose');

module.exports = function() {

    // Database
    mongoose.connect('mongodb://localhost/tradewinds');

    //Schemas
    var User = new mongoose.Schema({
	name: String,
	email: String,
	avatar: String,
    });

    //Models
    var UserModel = mongoose.model('User', User );
    
    return {
	UserModel: UserModel
    };
    
};