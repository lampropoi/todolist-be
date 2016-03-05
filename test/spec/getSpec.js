var request = require("request");
require("../commonMatchers.js");
require("../customMatchers.js");

var baseUrl = "http://localhost:8080/v1/todos/";

describe("Delete a todo", function() {
		it('returns 1 if the todo is found', function(done) {
			//add a new todo
			var data = {
				description: 'Have fun and get it' + Math.random()
			};
			var todoId = '';
			var addUrl = baseUrl + 'add';
			request.post(addUrl, {form: data} , function(error, response, body) {
				body = (JSON.parse(body));
					todoId = body.id;
					var getUrl = baseUrl + todoId;
					request.get(getUrl, function(error, response, body) {
					body = (JSON.parse(body));
					expect(response.statusCode).toBe(200);
					expect(body.description).toBe(data.description);
					done();
					});
			});
		});

		it('returns 0 if the id is invalid', function(done) {
			//add a new todo
			var todoId = 'blabla';
			var getUrl = baseUrl + todoId;
			request.get(getUrl, function(error, response, body) {
				body = (JSON.parse(body));
				expect(response.statusCode).toBe(200);
				expect(body.result).toBe(0);
				done();
			});
		});

		it('returns null if the id is not found', function(done) {
			//add a new todo
			var todoId = '507f191e810c19729de860ea';
			var getUrl = baseUrl + todoId;
			request.get(getUrl, function(error, response, body) {
				body = (JSON.parse(body));
				expect(response.statusCode).toBe(200);
				expect(body).toBeNull();
				done();
			});
		});
});
