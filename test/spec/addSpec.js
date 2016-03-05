var request = require("request");
require("../commonMatchers.js");
var baseUrl = "http://localhost:8080/v1/todos/add";

describe("Add a new todo", function() {
		it('Adds a new todo when valid data are sent', function(done) {
			var data = {
				description: 'Have fun',
				status: 'open'
			};
			request.post(baseUrl, {form: data} , function(error, response, body) {
				body = (JSON.parse(body));
				expect(body.result).toBe(1);
				done();
			});
		});
//validations
		it('Todo is not added - No description is sent', function(done) {
			var data = {
				status: 'open'
			};
			request.post(baseUrl, {form: data} , function(error, response, body) {
				body = (JSON.parse(body));
				expect(body.result).toBe(0);
				done();
			});
		});


		it('Todo is not added - Description is empty', function(done) {
			var data = {
				description: '',
				status: 'open'
			};
			request.post(baseUrl, {form: data} , function(error, response, body) {
				body = (JSON.parse(body));
				expect(body.result).toBe(0);
				done();
			});
		});

		it('Todo is added - status not sent at all', function(done) {
			var data = {
				description: 'Go for a walk'
			};
			request.post(baseUrl, {form: data} , function(error, response, body) {
				body = (JSON.parse(body));
				expect(body.result).toBe(1);
				done();
			});
		});

		it('Todo is added - Status is incorrect', function(done) {
			var data = {
				description: 'Go for a walk',
				status: 'pending'
			};
			request.post(baseUrl, {form: data} , function(error, response, body) {
				body = (JSON.parse(body));
				expect(body.result).toBe(1);
				done();
			});
		});
});
