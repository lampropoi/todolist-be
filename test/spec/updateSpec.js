var request = require("request");
require("../commonMatchers.js");
require("../customMatchers.js");

var baseUrl = "http://localhost:8080/v1/todos/";

describe("Update a todo", function() {
		it('returns 1 if the todo is updated', function(done) {
			//add a new todo
			var dataAdd = {
				description: 'Have fun and update it' + Math.random()
			};
			var todoId = '';
			var addUrl = baseUrl + 'add';
			request.post(addUrl, {form: dataAdd} , function(error, response, body) {
				body = (JSON.parse(body));
				todoId = body.id;
				var updateUrl = baseUrl + todoId + '/update';
				//update the added todo
				var dataUpdate = {
					description: 'Have fun and update it' + Math.random(),
					status: 'closed'
				};
			request.post(updateUrl, {form: dataUpdate}, function(error, response, body) {
				body = (JSON.parse(body));
				expect(response.statusCode).toBe(200);
				expect(body.result).toBe(1);
				done();
			});
			});
		});

		it('returns 0 when the format of id is wrong', function(done) {
			var todoId = '568653';
			var updateUrl = baseUrl + todoId + '/update';
			request.post(updateUrl, function(error, response, body) {
				expect(response.statusCode).toBe(200);
				body = (JSON.parse(body));
				expect(body.result).toBe(0);
				done();
			});
		});

		it('returns 0 when the ID not found', function(done) {
			var todoId = '507f191e810c19729de860ea';
			var updateUrl = baseUrl + todoId + '/update';
			request.post(updateUrl, function(error, response, body) {
				expect(response.statusCode).toBe(200);
				body = (JSON.parse(body));
				expect(body.result).toBe(0);
				done();
			});
		});
});
