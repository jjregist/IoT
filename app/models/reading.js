var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ReadingSchema   = new Schema({
	id: String,
	value: Number, 
	modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reading', ReadingSchema);
