var express = require('express');
var router = express.Router();
var http = require("http");
var https = require("https");
var request = require('request');
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

  router.get('/profile', isLoggedIn, function(req, res, next) {
    request('http://www.krakowpodreka.pl/en/stops/positions/stops/', function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    
      var retrievedStops = JSON.parse(body)
      console.log(retrievedStops[0]);
  
      res.render('profile', { title: 'Profil', stops: retrievedStops });
    });
  });
  
  router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
  });
  
  router.use('/', notLoggedIn, function(req, res, next) {
    next();
  });
  
  router.get('/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('signin', {csrfToken: req.csrfToken(), title: 'Logowanie', messages: messages, hasErrors: messages.lenght > 0});
  });
  
  router.get('/signup', function(req, res, next) {
    var messages = req.flash('error');
    res.render('signup', {csrfToken: req.csrfToken(), title: 'Rejestracja', messages: messages, hasErrors: messages.lenght > 0});
  });
  
  router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/signin',
    failureRedirect: '/user/signup',
    failureFlash: true
  }));
  
  router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/signin',
    failureFlash: true
  }));
  
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
  }
  
  function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
  }
  
  module.exports = router;