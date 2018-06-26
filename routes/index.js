var express = require('express');
var router = express.Router();
var http = require("http");
var https = require("https");
var request = require('request');
var Link = require('../models/link');

/* GET home page. */
router.get('/', function(req, res, next) {
  request('http://www.krakowpodreka.pl/en/stops/positions/stops/', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

    var retrievedStops = JSON.parse(body)
    console.log(retrievedStops[0]);
   
    res.render('index', { title: 'Mpk', stops: retrievedStops });
  });
});

module.exports = router;