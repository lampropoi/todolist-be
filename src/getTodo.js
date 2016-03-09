var mongoose = require('mongoose');
require('../models/todoSchema');
var Todo = mongoose.model('Todo');

exports.getTodo = function(router) {
	router.route('/todos/:todo_id')
	.get(function(req, res) {
		if (!req.params.todo_id.match(/^[0-9a-fA-F]{24}$/)) {
			res.json({result: 0, message: 'Id is invalid'});
		} else {
			Todo.findById(req.params.todo_id, function(err, todo) {
				if (err) {
					res.send(err);
				} else {
					res.json(todo);
				}
			});
		}
	});
};
