var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Drink = mongoose.model('Drink');
var DrinkSession = mongoose.model('DrinkSession');
var session = require('express-session');

var tempType; 



var sessionOptions = {
	secret: 'secret cookie thang',
	resave: true,
	saveUninitialized: true
};

router.use(session(sessionOptions));

router.use(function(req, res, next){
	console.log(req.user);
	if (!req.user)
	{
		console.log("you are no longer signed in");
		res.redirect('/login');
	}	
	else
		next();
});

/* GET home page. */
router.get('/:username', function(req, res, next) {
	console.log("GET to /drinks")
	// console.log("here is the GET body " + req.body);
	console.log("\nWe are looking at all the drinks");
	console.log(req.params);

	Drink.find({'username': req.params.username}, function(err, drinks, count){
		console.log(drinks);
		if (drinks.length !== 0){
			console.log("There are numerous drinks");
			var sum = 0;
			console.log('\nERRRMAAGGHHHDHDHHDD')
			for (var i = 0; i < drinks.length; i++){
				console.log(drinks[i].quantity);
				sum += drinks[i].quantity;
			}
			console.log('ERRRMAAGGHHHDHDHHDD\n')
			res.render('drinks', {'drinks': drinks, 'username': req.params.username, 'totalDrinks': sum});
		}
  		else
  			res.render('drinks', {'username': req.params.username});
	});
	
});


router.get('/:username/extra-details/:drinkType', function(req, res, next) {
	var obj = {username: req.params.username, drinkType: req.params.drinkType};
	if (req.params.drinkType === 'beer'){
		obj.isBeer = true;
	}

  	res.render('extra-details', obj);
});

router.post('/:username/add-drink/detailed/:drinkType', function(req, res, next){
	console.log("\n ** POSTING TO DETAILED ADD **");

	var drinkType = req.params.drinkType;
	var username = req.params.username;
	console.log(req.body);

	if (drinkType === 'beer'){
		var BreweryDb = require('brewerydb-node'); 
		var brewdb = new BreweryDb('2b1a72cb4890dbe80905afa7ef1d07de');
		var abv = 0;
		brewdb.beer.find({name: req.body.brand}, function(err, data){
			
			var tempABV = 0;
			if (data === null)
			{
				console.log('hi');
				tempABV = 4.5;
			}	
			else 
				temp = [0].abv;data

			var units = calcUnitsOfAlc(tempABV, 340);
			console.log("\n*** HERE ARE THE UNITS ***");
			console.log(units);
			var detailBeer = new Drink({
				username: username,
				type: 'Beer',
				abv: tempABV,
				quantity: req.body.drinks,
				brand: req.body.brand,
				mL: 340,
				units: units
			});

			detailBeer.save(function(err,d, count){
				console.log('detailBeer');
				console.log(d);
				res.redirect(303, '/drinks/' + username);
			});


		});
	}
	else if (drinkType =='wine'){
		
		var abv = req.body.abv;
		var numDrinks = req.body.drinks;
		var mL = 175;
		var units = calcUnitsOfAlc(abv, mL);
		var brand = req.body.brand;

		var detailWine = new Drink({
			username: username,
			type: 'Wine',
			abv: abv,
			quantity: numDrinks,
			brand: brand,
			mL: mL,
			units: units

		});

		detailWine.save(function(err,d, count){
			console.log('detailWine');
			console.log(d);
			res.redirect(303, '/drinks/' + username);
		});

	}
	else if(drinkType == 'shot'){
		console.log('detailShot');
		var abv = req.body.abv;
		var numDrinks = req.body.drinks;
		var mL = 44;
		var units = calcUnitsOfAlc(abv, mL);
		var brand = req.body.brand;

		var detailShot = new Drink({
			username: username,
			type: 'Shot',
			abv: abv,
			quantity: numDrinks,
			brand: brand,
			mL: mL,
			units: units

		});

		detailShot.save(function(err,d, count){
				console.log('detailShot');
				console.log(d);
				res.redirect(303, '/drinks/' + username);
		});

	}
});

router.post('/:username/add-drink', function(req, res, next){
	console.log("\n ** POSTING TO REG ADD **");
	console.log(req.body);

	var drinkType = req.body.drinkName;
	var username = req.params.username;

	if (req.body.extraDetails === 'on'){
		res.redirect(303, '/drinks/' + username + '/extra-details/' + drinkType);
	}
	else{
		var drinkType = req.body.drinkName;
		var username = req.params.username;
		



		if (drinkType === 'beer'){
			console.log('regBeer');
			var units = calcUnitsOfAlc(4.5, 340);
			var regBeer = new Drink({
				username: username,		//this line is only temporary
				type: 'Beer',
				abv: 4.5,
				quantity: 1,
				brand: 'Standard',
				mL: 340,
				units: units


			});
			regBeer.save(function(err, d, count){
				console.log("Saving a regBeer", d);
				res.redirect(303, "/drinks/" + username);

			});

		}
		else if (drinkType === 'wine'){
			console.log('regWine');
			var units = calcUnitsOfAlc(11.2, 175);
			var regWine = new Drink({
				username: username,		//this line is only temporary
				type: 'Wine',
				abv: 11.2,
				quantity: 1,
				brand: 'Standard',
				mL: 175,
				units: units


			});
			regWine.save(function(err, d, count){
				console.log("Saving a regWine", d);
				res.redirect(303, "/drinks/" + username);

			});
			
		}
		else if (drinkType === 'shot'){
			console.log('regShot');
			var units = calcUnitsOfAlc(4.5, 44);
			var regShot = new Drink({
				username: username,		//this line is only temporary
				type: 'Shot',
				abv: 40,
				quantity: 1,
				brand: 'Standard',
				mL: 44,
				units: units


			});
			regShot.save(function(err, d, count){
				console.log("Saving a regShot", d);
				res.redirect(303, "/drinks/" + username);

			});
			
		}
	}
});

router.get('/:username/api', function(req, res, next){

	var filter = {username: req.params.username};
	console.log("looking at api");
	console.log(req.query);
	if (req.query.drinkType && req.query.drinkType !== 'default'){
		filter.type = req.query.drinkType; 
	}

	Drink.find(filter, function(err, drinks, count) {
   		res.send(drinks);
  	});


});






router.post('/:username/sessions', function(req, res, next){
	console.log('\n** POSTING TO A NEW SESSION **');
	console.log(req.body);
	var username = req.params.username;
	var criteria = {username: req.params.username};
	var date = getDate();
	
	var totalMins = getMinutes(req.body.hours, req.body.minutes);

	

	Drink.find(criteria, function(err, drinks, count){
		console.log("\n** Adding drinks to session **");
		console.log(drinks);

		var allUnits = [];
		for (var i = 0; i < drinks.length; i++){
			allUnits.push(drinks[i].units);
		}
		var totalUnits = allUnits.reduce(sum);
		console.log('THESE ARE THE TOTAL UNITS', totalUnits);

		var drinkSession = new DrinkSession({
			username: username,
			date: date,
			period: totalMins, //in minutes
			totalUnits: totalUnits,
			numberOfDrinks: drinks.length,
			sessionDrinks: drinks
			
		});
		console.log("\n do we have a new session? \n");
		console.log(drinkSession);
		drinkSession.save(function(err, d, count){
			console.log("\n*** New Drink Session");
			console.log(err);
			console.log(d);
			Drink.remove(criteria, function(err, drinks){
				//console.log(err, drinks);
				res.redirect(303, '/drinks/' + username + '/sessions');
			});
			
		});
		
	});
	
	
});

router.get('/:username/sessions', function(req, res, next){
	// console.log(req.params.username);
	DrinkSession.find({username: req.params.username}, function(err, sessions, next){
		console.log("\n is there some sort of error: ", err);
		var info = {};
		var allSessions = []; 
		sessions.forEach(function(ele){
			console.log("\n here we are adding a new element", ele);
			allSessions.push(ele);

		});
		
		console.log('\n these are the sessions that we are passing: ', allSessions);
		
		res.render('sessions', {sessions: allSessions, username: req.params.username});
	})
	
});



// router.post('/:username/session', function(req, res, next){
// 	console.log('\n** POSTING TO A NEW SESSION **');
// 	console.log(req.body);
// 	var username = req.params.username;
// 	Drink.find({'username': username}, function(err, drinks, count){

// 	})

// });


var sum = function (total, num){
	return total + num;
}

function calcUnitsOfAlc(abv, mL){
	return (abv * mL)/1000;
}

function getMinutes(hours, minutes){
	return 60 * parseInt(hours) + parseInt(minutes);
}

//from http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript
function getDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	today = mm+'/'+dd+'/'+yyyy;
	return today;
}
module.exports = router;

