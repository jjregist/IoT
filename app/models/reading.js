var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ReadingSchema   = new Schema({
	value: Number
});

module.exports = mongoose.model('Reading', ReadingSchema);
