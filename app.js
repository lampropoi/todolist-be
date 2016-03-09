var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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
require('./src/addTodo.js').addTodo(router);

	/**
	 * [Get the todo list]
	 * @api  {get} /todos/all Get the todo list
	 * @apiSuccess {Object} A json object with all todos
	 * @apiVersion 0.1.0
	 */
require('./src/allTodos.js').allTodos(router);

		/**
		 * [Get the todo with that id]
		 * @api  {get} /todos/:todo_id Get the todo with that id
		 * @apiSuccess {Object} A json object with the requested todo
		 * @apiVersion 0.1.0
		 */

require('./src/getTodo.js').getTodo(router);

	/**
	 * [Update the todo with that id]
	 * @api  {post} /todos/:todo_id/update Update the todo with that id
	 * @apiParam {String} description The description of the todo
	 * @apiParam {String} status  status of the todo ('open' || 'closed')
	 * @apiSuccess {String} result 0: if not updated, 1: if updated
	 * @apiSuccess {String} message return message
	 * @apiVersion 0.1.0
	 */

require('./src/updateTodo.js').updateTodo(router);

		/**
		 * [Delete the todo with that id]
		 * @api  {post} /todos/:todo_id/delete Delete the todo with that id
		 * @apiSuccess {String} result 0: if not deleted, 1: if deleted
		 * @apiSuccess {String} message return message
		 */

require('./src/deleteTodo.js').deleteTodo(router);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /v1
app.use('/v1', router);

// START THE SERVER
// =============================================================================
app.listen(port);

// Connect to DB
mongoose.connect('mongodb://todolistdb:todolistdb!@ds035543.mongolab.com:35543/todolistdb');
var db = mongoose.connection;
db.on('error', function(error) {
	console.log('db.connect.fail', error);
});
db.once('open', function() {
	console.log('db.connect.success');
});
