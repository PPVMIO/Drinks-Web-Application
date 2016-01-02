//

function validHoursMinutes(){
	var hours = document.getElementById('hrForm');
	var mins = document.getElementById('minForm');
	if ((parseInt(hours.value) != hours.value) || (parseInt(mins.value) != mins.value)){
		alert('Both the hours and minutes field should be numerical values'); 
		return false;
	}	
	else
		return true;
}

function validateDetails(){
	
	var brandBeer = document.getElementById('beerChoice');
	
	var isBeer = false;
	if (brandBeer != null)
		isBeer = true;
	var regBrand = document.getElementById('regBrand');
	var abv = document.getElementById('abvfield');
	var quantity = document.getElementById('numDrinks');




	if (isBeer){
		console.log(parseInt(quantity.value));
		if (isNaN(parseInt(quantity.value))
			|| brandBeer.selectedIndex == 0){
			alert('Errors with the fields'); 
			return false;
		}
	}
	else{
		console.log(regBrand.value);
		if (regBrand.value == ""
			|| isNaN(parseInt(abv.value))
			|| isNaN(parseInt(quantity.value))){
			alert('Errors with the fields'); 
			return false;
		}
	}

	console.log('format is good');
	return true;
	
		
	
}