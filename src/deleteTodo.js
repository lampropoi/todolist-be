var mongoose = require('mongoose');
require('../models/todoSchema');
var Todo = mongoose.model('Todo');

exports.deleteTodo = function(router) {
	router.route('/todos/:todo_id/delete')
	.post(function(req, res) {
		if (!req.params.todo_id.match(/^[0-9a-fA-F]{24}$/)) {
			res.json({result: 0, message: 'Id is invalid'});
		} else {
			Todo.remove({
				_id: req.params.todo_id
			}, function(err, data) {
				if (err) {
					res.send(err);
				} else if (data.result.n !== 1 ) {
					res.json({result: 0, message: 'Id not found!'});
				} else {
					res.json({result: 1, message: 'Todo deleted!'});
				}
			});
		}
	});
};
