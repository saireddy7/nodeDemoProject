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
    myCart : [{
        productId : {type:ObjectId,ref:'products'},
        quantity : Number,
        size : String
    }],
    wishList : [{type:ObjectId,ref:'products'}],
    password : String,
    geometry: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number]  //longitude(varies b/w -180 and 180 W/E), latitude(varies b/w -90 and 90 N/S)
        }
    },
    facebookUrl: String,
    twitterUrl: String,
    googlePlusUrl: String,
    isVerified : Boolean,
    role : String
},{ timestamps: true });

var coordinatesSchema = new mongoose.Schema({
    geometry: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number]  //longitude(varies b/w -180 and 180 W/E), latitude(varies b/w -90 and 90 N/S)
        }
    }
});

coordinatesSchema.index({geometry: '2d'});

var addressSchema = new mongoose.Schema({
    userId : {type:ObjectId,ref:'users'},
    name : String,
    mobile : Number,
    pincode : Number,
    locality : String,
    address : String,
    city : String,
    state : String,
    landmark : String,
    alternateMobile : Number,
    typeOfAddress : String
},{ timestamps: true });

var productSchema = new mongoose.Schema({
    vendorId : {type:ObjectId,ref:'users'},
    // vendorName : String,
    name : String,
    description : String,
    brand : String,
    price : Number,
    discount : Number,
    discountedPrice : Number,
    category : [String],
    categoryIds : [String],
    quantity : Number,
    types : [{
        type : {type: String},
        quantity : Number
    }],
    // colors : [String],
    code : String,
    availableMode : Boolean,
    images : [String]
},{ timestamps: true });

var ordersSchema = new mongoose.Schema({
    OrderId : String,
    finalOrderId : {type:ObjectId,ref:'finalOrders'},
    userId : {type:ObjectId,ref:'users'},
    vendorId : {type:ObjectId,ref:'users'},
    productId : {type:ObjectId,ref:'products'},
    addressId : {type:ObjectId,ref:'addresses'},
    size : String,
    quantity : Number,
    price : Number,
    discount : Number,
    discountedPrice : Number,
    orderStatus : String
},{ timestamps: true });

var finalOrders = new mongoose.Schema({
    userId : {type:ObjectId,ref:'users'},
    orders : [{type:ObjectId,ref:'orders'}],
    price : Number,
    priceAfterCoupon : Number,
    paymentStatus : String,
    coupon : {
        name : String,
        value : Number
    }
},{ timestamps: true });

var categorySchema = new mongoose.Schema({
    categoryName : String,
    path : String, //mens>>footwear>>sports
    level : Number,
    types : [String],
    parent : {type:ObjectId,ref:'categories'}, //parent category
    grandParent : {type:ObjectId,ref:'categories'} //parent category
},{ timestamps: true });

var locationsSchema = new mongoose.Schema({
    location : String
},{timestamps:true});

var pincode = new mongoose.Schema({
    pincodeNumber: Number,
    location: String
},{timestamps:true});

var postsSchema = new mongoose.Schema({
    userId : {type:ObjectId,ref:'users'},
    compId : {type:ObjectId,ref:'businesses'},
    content : {
        heading: String,
        text: String,
        category : String,
        images : [String],
        link: String
    },
    time : Number,
    isShared : Boolean,
    userName : String
},{ timestamps: true });

var likes = new mongoose.Schema({
    postId : {type:ObjectId,ref:'posts'},
    userId : {type:ObjectId,ref:'users'},
    userName : String,
    time : Number,
    isViewed : Boolean,
    type : Boolean
},{ timestamps: true });

var comments = new mongoose.Schema({
    postId : {type:ObjectId,ref:'posts'},
    userId : {type:ObjectId,ref:'users'},
    content : String,
    userName : String,
    time : Number,
    isViewed : Boolean
},{ timestamps: true });

var shares = new mongoose.Schema({
    postId : {type:ObjectId,ref:'posts'},
    userId : {type:ObjectId,ref:'users'},
    userName : String,
    time : Number,
    isViewed : Boolean
},{ timestamps: true });

module.exports = {
    users : mongoose.model('users', usersSchema),
    addresses : mongoose.model('addresses', addressSchema),
    products : mongoose.model('products', productSchema),
    orders : mongoose.model('orders', ordersSchema),
    finalOrders : mongoose.model('finalOrders', finalOrders),
    categories : mongoose.model('categories', categorySchema),
    locations : mongoose.model('locations', locationsSchema),
    pincode: mongoose.model('pincodes', pincode),
    Posts : mongoose.model('posts', postsSchema),
    Likes : mongoose.model('likes', likes),
    Comments : mongoose.model('comments', comments),
    Shares : mongoose.model('shares', shares),
    coordinates : mongoose.model('coordinates', coordinatesSchema)
};