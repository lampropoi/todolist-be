var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
	description: {type: String, required: true},
	status: {type: String, enum: ['open', 'closed']}
}, {
	collection: 'Todos'
});

module.exports = mongoose.model('Todo', TodoSchema);
