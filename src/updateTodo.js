var mongoose = require('mongoose');
require('../models/todoSchema');
var Todo = mongoose.model('Todo');

exports.updateTodo = function(router)
	{
		router.route('/todos/:todo_id/update')
		.post(function(req, res) {
			if (!req.params.todo_id.match(/^[0-9a-fA-F]{24}$/)) {
				res.json({result: 0, message: 'Id is invalid'});
			} else {
				Todo.findById(req.params.todo_id, function(err, todo) {
					if (err) {
						res.send(err);
					}
					if (!todo) {
						res.json({result: 0, message: 'Id not found!'});
					} else {
						todo.description = req.body.description;  // update the todos info
						todo.status = req.body.status;
						var passedJson = validateJson(todo.description, todo.status);
						if (passedJson.result === 1) {
							// update the odo
							todo.save(function(err) {
								if (err) {
									res.send(err);
								}
								res.json({result: 1, message: 'Todo updated!'});
							});
						} else {
							res.send(passedJson);
						}
					}
				});
			}
		});
};

function validateJson(description, status){
	var checkStatus = status === undefined ||
									(status !== 'open' && status !== 'closed');
	var passedJson = {};
	if (description === undefined || description === '') {
		passedJson = {result: 0, message: 'Missing Description!'};
	} else if (checkStatus) {
		passedJson = {result: 0, message: 'Missing/Wrong status!'};
	} else {
		passedJson = {result: 1};
	}
	return passedJson;
}
