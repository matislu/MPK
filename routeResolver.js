const Graph = require('node-dijkstra')
var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();

const route = new Graph()
route.addVertex('65', { 73:4 })
route.addVertex('73', { 65:4, 63:4 })
route.addVertex('63', { 73:4, 64:2 })
route.addVertex('64', { 63:2 })

router.post('/for', function(req, res, next) { 
    var firstStopId = req.body.startDestinationId;
    var secondStopId  = req.body.endDestinationId;
    console.log(firstStopId);
    console.log(secondStopId);

    let shortestPath = route.shortestPath(String(firstStopId), String(secondStopId));
    console.log(JSON.stringify(shortestPath));
    res.send(JSON.stringify(shortestPath));
})

module.exports = router;