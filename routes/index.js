var express = require('express'), 
    router = express.Router(),
    passport = require('passport'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

router.get('/', function(req, res) {
  res.redirect('/login');
});

router.get('/login', function(req, res) {
  res.render('login');
});



router.post('/login', function(req,res,next) {
  passport.authenticate('local', function(err,user) {
    console.log(user);
    if(user) {
      req.logIn(user, function(err) {
        console.log("login successful");
        // console.log('here is the slug: ' + req.body.slug);
        //console.log(req.user._id);
        res.redirect('/drinks/' + user.username);
      });
    } else {
      res.render('login', {message:'Your login or password is incorrect.'});
    }
  })(req, res, next);
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  User.register(new User({username:req.body.username}), 
      req.body.password, function(err, user){
    if (err) {
      // NOTE: error? send message back to registration...
      res.render('register',{message:'Your username is not valid'});
    } else {
      // NOTE: once you've registered, you should be logged in automatically
      // ...so call authenticate if there's no error
      passport.authenticate('local')(req, res, function() {
        res.redirect('/drinks/' + user.username);
      });
    }
  });   
});

module.exports = router;