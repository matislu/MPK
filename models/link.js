var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var linkSchema = new Schema({ 
    startId: {type: Number, required: true},
    endId: {type: Number, required: true},
    timeBetweenStops: {type: Number, required: true}
});

module.exports = mongoose.model('Link', linkSchema);