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
/* Routes for our API */

router.route('/todos')
// create a new todo
	.post(function(req, res) {
		var todo = new Todo();
		todo.description = req.body.description;
		todo.status = 'open';
		todo.save(function(err) {
			if (err) {
				res.send(err);
			} else {
				res.json({message: 'Duty saved!'});
			}
		});
	})
		// get all todos
		.get(function(req, res) {
			Todo.find(function(err, todos) {
				if (err) {
					res.send(err);
				} else {
					res.json(todos);
				}
			});
		});

router.route('/todos/:todo_id')
// get the todo with that id
	.get(function(req, res) {
		Todo.findById(req.params.todo_id, function(err, todo) {
			if (err) {
				res.send(err);
			} else {
				res.json(todo);
			}
		});
	})
		.put(function(req, res) {
	// use our todo model to find the todo we want
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
		})
	// delete the todo with this id
	.delete(function(req, res) {
		Todo.remove({
			_id: req.params.todo_id
		}, function(err, todo) {
			if (err) {
				res.send(err);
			}
			res.json({message: 'Successfully deleted'});
		});
	});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({message: 'hooray! welcome to our api!'});
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
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
