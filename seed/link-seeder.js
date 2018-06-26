var Link = require('../models/link');
const Graph = require('node-dijkstra')

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');


var links = [
    new Link({
        //politechnika -> nowy kleparz
        startId: 65,
        endId: 73,
        timeBetweenStops: 4
    }),
    new Link({
        //nowy kleparz -> politechnika
        startId: 73,
        endId: 65,
        timeBetweenStops: 4
    }),
    new Link({
        //plac inwalidów -> nowy kleparz
        startId: 63,
        endId: 73,
        timeBetweenStops: 4
    }),
    new Link({
        //nowy kleparz -> plac inwalidów
        startId: 73,
        endId: 63,
        timeBetweenStops: 4
    }),
    new Link({
        //plac inwalidów -> urzędnicza
        startId: 63,
        endId: 64,
        timeBetweenStops: 2
    }),
    new Link({
        //urzędnicza -> plac inwalidów
        startId: 64,
        endId: 63,
        timeBetweenStops: 2
    }),
    new Link({
        //biprostal -> urzęd
        //urzędnicza -> plac inwalidów
        startId: 64,
        endId: 63,
        timeBetweenStops: 2
    }),
    new Link({
        //biprostal -> urzędnicza
        startId: 12,
        endId: 64,
        timeBetweenStops: 2
    }),
    new Link({
        //urzędnicza -> biprostal
        startId: 64,
        endId: 12,
        timeBetweenStops: 2
    })
];  
var done = 0;
for (var i = 0; i < links.length; i++) {
    links[i].save(function(err, result) {
        done++;
        if(done === links.length){
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
