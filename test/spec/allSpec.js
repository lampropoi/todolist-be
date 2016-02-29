//require("../../app.js");
var request = require("request");
require("../commonMatchers.js");
require("../customMatchers.js");

var baseUrl = "http://localhost:8080/v1/todos/all"

describe("Get all todos", function() {
		it('returns 200 OK', function(done) {
			request.get(baseUrl, function(error, response, body) {
			body = (JSON.parse(body));
			expect(body).toBeListOf('Todos');
			expect(response.statusCode).toBe(200);
			done();
			});
		});
});
