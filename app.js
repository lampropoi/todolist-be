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

// Create a new todo
router.route('/todos/add')
	.post(function(req, res) {
		var todo = new Todo();
		todo.description = req.body.description;
		todo.status = 'open';
		todo.save(function(err) {
			if (err) {
				res.send(err);
			} else {
				res.json({message: 'Todo saved!'});
			}
		});
	});

	// Get all todos
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

	// Get the todo with that id
router.route('/todos/:todo_id')
	.get(function(req, res) {
		Todo.findById(req.params.todo_id, function(err, todo) {
			if (err) {
				res.send(err);
			} else {
				res.json(todo);
			}
		});
	});

	// Update the todo with that id
router.route('/todos/:todo_id/update')
		.post(function(req, res) {
			Todo.findById(req.params.todo_id, function(err, todo) {
				if (err) {
					res.send(err);
				}
				todo.description = req.body.description;  // update the todos info
				todo.status = req.body.status;
			// save the todo
				todo.save(function(err) {
					if (err) {
						res.send(err);
					}
					res.json({message: 'Todo updated!'});
				});
			});
		});

	// Delete the todo with this id
router.route('/todos/:todo_id/delete')
	.post(function(req, res) {
		Todo.remove({
			_id: req.params.todo_id
		}, function(err, todo) {
			if (err) {
				res.send(err);
			}
			res.json({message: 'Successfully deleted'});
		});
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
