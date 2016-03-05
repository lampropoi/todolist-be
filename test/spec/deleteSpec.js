var request = require("request");
require("../commonMatchers.js");
require("../customMatchers.js");

var baseUrl = "http://localhost:8080/v1/todos/"

describe("Delete a todo", function() {
		it('returns 1 if the todo is found', function(done) {

			//add a new todo
			var data = {
				description: 'Have fun and delete',
				status: 'open'
			};
			var todoId = '';
			var addUrl = baseUrl + 'add';
			request.post(addUrl, {form: data} , function(error, response, body) {
					body = (JSON.parse(body));
					todoId = body.id;
					var deleteUrl = baseUrl + todoId + '/delete';
					request.post(deleteUrl, function(error, response, body) {
					expect(response.statusCode).toBe(200);
					body = (JSON.parse(body));
					expect(body.result).toBe(1);
					done();
					});
			});
		});

		it('returns 0 when the format of id is wrong', function(done) {
			var todoId = '568653';
			var deleteUrl = baseUrl + todoId + '/delete';
			request.post(deleteUrl, function(error, response, body) {
				expect(response.statusCode).toBe(200);
				body = (JSON.parse(body));
				expect(body.result).toBe(0);
				done();
			});
		});

		it('returns 0 when the format of id is wrong', function(done) {
			var todoId = '568653';
			var deleteUrl = baseUrl + todoId + '/delete';
			request.post(deleteUrl, function(error, response, body) {
				expect(response.statusCode).toBe(200);
				body = (JSON.parse(body));
				expect(body.result).toBe(0);
				done();
			});
		});

		it('returns 0 when the ID not found', function(done) {
			var todoId = '507f191e810c19729de860ea';
			var deleteUrl = baseUrl + todoId + '/delete';
			request.post(deleteUrl, function(error, response, body) {
				expect(response.statusCode).toBe(200);
				body = (JSON.parse(body));
				expect(body.result).toBe(0);
				done();
			});
		});
});
