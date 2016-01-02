// users
var User = new mongoose.Schema({
  lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
});

// remember all the drinks had previously
var DrinkingHistory = new mongoose.Schema({
	person: String,
	history: [drinkList]
});

// keep track of the drinks in one session
var drinkList = new mongoose.Schema({
	night: Number,
	drinks: [Drink]
});


//schema for a single drink
var Drink = new mongoose.Schema({
	AbV: {type: Number, required: true},
	quantity: {type: Number, required: true},
	brand: {type: String, required: false},
	id: {type: Number, required: true}
}, {
	_id: true
});