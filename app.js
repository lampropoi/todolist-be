var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./models/todoSchema');
var Todo = mongoose.model('Todo');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

/* ****************** */
/* Routes for our API */
/* ****************** */

/**
 * [Add a new todo in the list]
 * @api  {post} /todos/add Add a new todo in the list
 * @apiParam {String} description The description of the todo
 * @apiSuccess {String} result 0: if not saved, 1: if saved
 * @apiSuccess {String} id id of saved todo
 * @apiSuccess {String} message return message
 * @apiVersion 0.1.0
 */
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

	/**
	 * [Get the todo list]
	 * @api  {get} /todos/all Get the todo list
	 * @apiSuccess {Object} A json object with all todos
	 * @apiVersion 0.1.0
	 */
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

		/**
		 * [Get the todo with that id]
		 * @api  {get} /todos/:todo_id Get the todo with that id
		 * @apiSuccess {Object} A json object with the requested todo
		 * @apiVersion 0.1.0
		 */
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

	/**
	 * [Update the todo with that id]
	 * @api  {post} /todos/:todo_id/update Update the todo with that id
	 * @apiParam {String} description The description of the todo
	 * @apiParam {String} status  status of the todo ('open' || 'closed')
	 * @apiSuccess {String} result 0: if not updated, 1: if updated
	 * @apiSuccess {String} message return message
	 * @apiVersion 0.1.0
	 */
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

		/**
		 * [Delete the todo with that id]
		 * @api  {post} /todos/:todo_id/delete Delete the todo with that id
		 * @apiSuccess {String} result 0: if not deleted, 1: if deleted
		 * @apiSuccess {String} message return message
		 */
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

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /v1
app.use('/v1', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

// Connect to DB
mongoose.connect('mongodb://todolistdb:todolistdb!@ds035543.mongolab.com:35543/todolistdb');
var db = mongoose.connection;
db.on('error', function(error) {
	console.log('db.connect.fail', error);
});
db.once('open', function() {
	console.log('db.connect.success');
});

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

exports.closeServer = function(){
	app.close();
};
