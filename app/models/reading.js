var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ReadingSchema   = new Schema({
	hid: { type: String, required: true },
	value: Number,
	battery: Number,
	modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reading', ReadingSchema);
