var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build();

driver.get('http://localhost:3000/login');


//test logging in
function loginTest(){
	var usernameField = driver.findElement(webdriver.By.name('username'));
	var passwordField = driver.findElement(webdriver.By.name('password'));
	usernameField.sendKeys('asdf');
	passwordField.sendKeys('asdf');
	var loginButton = driver.findElement(webdriver.By.id('loginBtn'));
	loginButton.click();
	
	
}


//tests adding beer, wine and shot and creating a session
function createSessionTest(hrs, mins){
	

	driver.findElement(webdriver.By.id('beerBtn')).click();
	driver.findElement(webdriver.By.id('wineBtn')).click();
	driver.findElement(webdriver.By.id('shotBtn')).click();

	driver.findElement(webdriver.By.name('hours')).sendKeys(hrs);
	driver.findElement(webdriver.By.name('minutes')).sendKeys(mins);

	driver.findElement(webdriver.By.name('createSession')).click();

}

function createDetailedSessionTest(num, hrs, mins){
	driver.findElement(webdriver.By.id('extra-details')).click();
	driver.findElement(webdriver.By.id('beerBtn')).click();
	driver.findElement(webdriver.By.name('brand')).click();
	driver.findElement(webdriver.By.id('testValue')).click();
	driver.findElement(webdriver.By.id('numDrinks')).sendKeys(num);
	driver.findElement(webdriver.By.id('addDet')).click();

	driver.findElement(webdriver.By.name('hours')).sendKeys(hrs);
	driver.findElement(webdriver.By.name('minutes')).sendKeys(mins);

	driver.findElement(webdriver.By.name('createSession')).click();

	

}

function testLogout(){
	driver.findElement(webdriver.By.id('logout')).click();
	driver.wait(function() {
	 	return driver.getCurrentUrl().then(function(title) {
	   		return title === 'http://localhost:3000/login';
	 	});
	}, 2000);

}

function registerNewAccount(id){
	driver.findElement(webdriver.By.id('register')).click();

	var usernameField = driver.findElement(webdriver.By.name('username'));
	var passwordField = driver.findElement(webdriver.By.name('password'));
	usernameField.sendKeys(id);
	passwordField.sendKeys(id);
	driver.findElement(webdriver.By.id('registerBtn')).click();

}




loginTest();
testLogout();
registerNewAccount('New Test Name');
createSessionTest(1, 5);
driver.findElement(webdriver.By.id('newSess')).click();
createDetailedSessionTest(1, 2, 5);

console.log("Order of tests");
console.log("1. testLogout");
console.log("2. registerNewAccount");
console.log("3. createSessionTest");
console.log("4. createDetailedSessionTest");






