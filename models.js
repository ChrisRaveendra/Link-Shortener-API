"use strict";

// Project model
var mongoose = require('mongoose');
let validators = require('mongoose-validators');

var Urls = mongoose.model('Urls', {
    originalURL: {
        type: String,
        required: true
    },
    shortURL: {
        type: String,
        required: true
    }
})

module.exports = {
    Urls: Urls
}
