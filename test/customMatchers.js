/**
 * In this file we include tests that examine an object
 */
beforeEach(function() {

	var customMatchers = {
		toBeTodos: function() {
			var value = this.actual;
			expect(value).toHaveTheseAttributes(['_id', 'description', 'status']);
			expect(value._id).toBeId();
			expect(value.description).toBeNotEmptyString();
			expect(value.status).toBeString();
			return true;
		}
	};

	this.addMatchers(customMatchers);
});
