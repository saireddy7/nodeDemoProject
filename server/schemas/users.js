var mongoose = require('mongoose');
var config = require('./../config/config.js');
var ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.connect(config.mongo.url, {user: config.mongo.user, pass: config.mongo.pass});
var connection = mongoose.connection;

connection.once('open', function(){
    console.log('CONNECTED TO MONGODB')
});

connection.on('error', function(err){
    console.log('ERROE CONNECTED TO MONGODB')
});

var usersSchema = new mongoose.Schema({
    fullName : String, //
    shopName : String,
    email : String, //
    mobile : Number,    //
    dob : Date,   //
    gender : String,    //
    location : String,
    address : String,
    pincode : Number,
    locality : String,
    city : String,
    state : String,
    country : String,
    landmark : String,
    panNumber : String,
    gstinNumber : String,
    vatNumber : String,
    password : String,
    facebookUrl: String,
    twitterUrl: String,
    googlePlusUrl: String,
    role : String
},{ timestamps: true });

module.exports = {
    users : mongoose.model('users', usersSchema)
};