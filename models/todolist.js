var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodolistSchema = new Schema({
		duty: String
});

module.exports = mongoose.model('Duty', TodolistSchema);
