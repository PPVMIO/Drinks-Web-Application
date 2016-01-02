//db.js

console.log('db.js in use');

var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
URLSlugs = require('mongoose-url-slugs');



//schema for a single drink
var Drink = new mongoose.Schema({
	username: String,
	type: {type: String, required: true},	//1 for beer, 2 for wine, 3 for shot
    abv: {type: Number, required: true},
    quantity: {type: Number, required: true},
    brand: {type: String, required: false},
    mL: {type: Number, required: true},
    units: Number
    
});

var DrinkSession = new mongoose.Schema({
	username: String,
	date: String,
	totalUnits: Number,
	period: Number, //in minutes
	numberOfDrinks: Number,
	sessionDrinks: [Drink]
});
var UserSchema = new mongoose.Schema({ 
	
});


UserSchema.plugin(passportLocalMongoose);

mongoose.model('User', UserSchema);

mongoose.model('Drink', Drink);
mongoose.model('DrinkSession', DrinkSession);
mongoose.connect('mongodb://localhost/drinksdb');