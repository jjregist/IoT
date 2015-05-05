var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ReadingSchema   = new Schema({
	value: String
});

module.exports = mongoose.model('Reading', ReadingSchema);
