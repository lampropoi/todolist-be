var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('../models/todoSchema');
var Todo = mongoose.model('Todo');

exports.allTodos = function(router) {
	router.route('/todos/all')
		.get(function(req, res) {
			Todo.find(function(err, todos) {
				if (err) {
					res.send(err);
				} else {
					res.json(todos);
				}
			});
		});
};
