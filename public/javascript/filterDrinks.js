//gets the correct data from the api
document.addEventListener("DOMContentLoaded", function(){
	var btn = document.getElementById('filterButton');
	btn.addEventListener("click", function(evt){
		evt.preventDefault();
		var username = document.getElementById('username').value;
		var url = "http://localhost:3000/drinks/" + username + "/api";
		var drinkType = document.getElementById('typeChooser').value;
		console.log(drinkType);
		url = url + "?drinkType=" + drinkType;
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
		console.log('clicked');
		req.addEventListener("load", function load() {
			console.log('response text');
			console.log(req.responseText);
			var div = document.createElement('div');
			var tbody = document.createElement('tbody');
			tbody.id = "all-drinks";
			JSON.parse(req.responseText).forEach(function(drink) {
				// var li = div.appendChild(document.createElement('li'));
				// li.textContent = drink.brand + ' ' + drink.type + ' x ' + drink.quantity;

				console.log(drink);


				var tr = tbody.appendChild(document.createElement('tr'));
				tr.appendChild(document.createElement('td')).textContent = drink.type;
				tr.appendChild(document.createElement('td')).textContent = drink.brand;
				tr.appendChild(document.createElement('td')).textContent = drink.quantity;



			});
			var currDrinks = document.getElementById('all-drinks');
			currDrinks.parentNode.replaceChild(tbody, currDrinks);
			console.log(div);
		
		});
		req.send();
	})
})