var mongoose = require('mongoose');
require('../models/todoSchema');
var Todo = mongoose.model('Todo');

exports.addTodo = function(router) {
	router.route('/todos/add')
	.post(function(req, res) {
		var todo = new Todo();
		todo.description = req.body.description;
		todo.status = 'open';
		var passedJson = validateJson(todo.description, todo.status);
		if (passedJson.result === 1) {
		// add the new todo
		todo.save(function(err, data) {
			if (err) {
				res.send(err);
			} else {
				res.json({result: 1, id: data.id, message: 'Todo saved!'});
			}
		});
		} else {
			res.send(passedJson);
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
