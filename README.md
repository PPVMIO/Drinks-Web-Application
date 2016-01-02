# Overview
While on reddit, I stumbled across an [article](http://draftmag.com/science-session-abv-processing/) pertaining to session drink, or the act of having three or more beers in one setting.  The article takes a look into the abv of beer and the actual difference between a 4% and a 5% beer.  The results, when drinking multiple beers (at least 3), were shocking.  It turns out a person who drinks 3 abv5% beers, intakes twice as many units of alcohol as compared to a person who drinks 3 abv4% beers.  

This website is dedicate to creating a simple interface that allows users to enter the number of drinks they have had - as well as more detailed inputs like abv, consumption per hour, mL of liquid - in order to get a good understanding of how drunk certain drinks get them.  The purpose of this website is to inform users about how much they are actually consuming.  This method is better than the typical "I had 4 or so drinks so I should be good" method. 


# Sample JSON Objects for Project
Minimally, we'll have to store users, the history of the users, the lists of drinks, the drinks themselves

First draft schema:

```javascript
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
```

# Wireframes
![Main Page Wireframe](/docs/wireframes/title_page.jpg "Main Page")
![Extra Details Wireframe](/docs/wireframes/extra_details.jpg "Main Page")
![Display Stats Wireframe](/docs/wireframes/display_stats.jpg "Main Page")

# Sitemap
![Sitemap](/docs/wireframes/sitemap.jpg "Main Page")

# User Stories
As a user, I want to be able to click a beer/wine/shot button WITHOUT the extra details checkbox and see a generic beer/wine/shot appear below

As a user, I want to be able to click a beer/wine/shot button WITH the extra details checkbox and be taken to a page where I can enter detailed information about the drink

As a user, on the extra details page, I want to be able to enter specific details about the drink.  When the info is filled out the submit button is clicked, I want to be returned to the main page where I will see the information appear on the screen

As a user, once at least one drink is added, and the required information is filled out, I want to be able to click the Display Stats button, that will take me to the display stats page

From the server side, I want to keep a historical record of all drinks consumed so I can display the information as a comparison to the current drinks consumed

# Research
2pts - External API: Find an API that has a list of beers, wines, liquors so that the user can search for a brand rather than type in all the information itself.  Note: if API cannot be found for all alcohol types, just an API for beers shall be used.  Some of the considered APIs are below
	* [drizly (beta)](http://developers.drizly.com/) - UPDATE: could not get access to the beta
	* [breweryDB](http://www.brewerydb.com/developers) - UPDATE: used

3pts - Automated Testing: I am currently a Mobile QA Intern for a comapany called Booker Software.  We are just beginning to implement some automated testing for both the android and iOS app; however, I have done nothing for web pages.  I am planning to look into Selenium  since the current tool my company is using, Appium, is built off of the Selenium webdriver. 

3pts - Implement User Registration:  I want to implement user registration so that user's can keep track of their history of alcohol consumption.  

# Grading

Project can be accessed at http://i6.cims.nyu.edu:10460/

If you wish to see a currently created account use

	username: asdf
	passowrd: asdf
	
This is also the credentials used for the automated tests.  You are, however, free to register your own account.

[This](https://github.com/nyu-csci-ua-0480-002-fall-2015/pp1286-final-project/blob/master/public/javascript/filterDrinks.js) is the script for the ajax.  The ajax form is the filter option (div id="filter") located in the [here](https://github.com/nyu-csci-ua-0480-002-fall-2015/pp1286-final-project/blob/master/views/drinks.hbs) in the drinks.hbs file

[This](https://github.com/nyu-csci-ua-0480-002-fall-2015/pp1286-final-project/tree/master/tests) is where you can find the selenium test class and the .mov screen capture of the automated test running locally - note this is not set up to test the i6 deployed site



