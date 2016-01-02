//api testing

var BreweryDb = require('brewerydb-node'); 
var brewdb = new BreweryDb('2b1a72cb4890dbe80905afa7ef1d07de');


// /beer/:beerId
// brewdb.beer.getById("avMkil", {});      

// // /beers?ids=
// brewdb.beer.getById(["avMkil", "XcvLTe"], { withBreweries: "Y" });     

// /beers?name=“bock”&abv=....
// can provide params that beers endpoint accepts (like abv, ibu, etc.)
// var testBeer = brewdb.beer.find({ name:"bock"}, function(err, data){

// 	console.log(data);
// })



function addBeer(beerName, quantity){

	if (quantity == undefined)
		quantity = 1;
	var beer = new Object();

	brewdb.beer.find({name: beerName}, function(err, data){
		console.log(data);
		// var temp = data;
		// beer.type = 1;
		// beer.brand = temp[0].name;
		// beer.abv = temp[0].abv;
		// beer.quantity = quantity;
		// beer.mL = 340;
		// console.log(beer);
		
	});
	
}

function testAddBeer(){
	// addBeer("Alaskan Stout");
	addBeer("Alpha King");
}
testAddBeer();

//to be used with a dropdown menu
function getListOfBeers(){

}
