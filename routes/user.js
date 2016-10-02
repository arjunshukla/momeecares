var router = require('express').Router();
var usersController = require('../controllers/users');
var passport = require('passport');
var passportController = require('../controllers/passport');

router.get('/login', function (req, res, next) {
  if(req.user) return res.redirect('/');
  res.render('accounts/login', {message: req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login',{
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/profile', function (req, res) {
  usersController.User.findOne({_id: req.user._id}, function(err, user){
    if(err) return next(err);
    res.render('accounts/profile', {user: user});
  });
});

router.get('/signup', function(req, res, next){
res.render('accounts/signup',{
  errors : req.flash('errors')
});
});

router.post('/signup', function(req, res, next){
  usersController.createUser(req, function(error, result){
    if(result != "User already exists"){
        res.redirect('/profile');
    }
    else {
      console.log(error);
      req.flash('errors', 'Account with that email address already exists.');
      res.redirect('/signup');
    }
  })
});

router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/')
});

router.get('/edit-profile', function (req, res, next) {
  res.render('accounts/edit-profile', {message: req.flash('success')});
});

router.post('/edit-profile', function (req, res, next) {
  usersController.updateUser(req, function(err, message){
    if(err) return next(err);
    req.flash('success', message);
    return res.redirect('/edit-profile');
  });
});

module.exports = router;
