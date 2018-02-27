
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
var shortid = require('shortid');

var LaneSchema = Schema({
    title: String,
    id: {
        type: String,
        'default': shortid.generate
    },
    cards: [{
        id: {
            type: String,
            'default': shortid.generate
        },
        title: String, description: String

    }]

});


module.exports = mongoose.model('Lanes', LaneSchema);


