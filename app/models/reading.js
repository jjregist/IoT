var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ReadingSchema   = new Schema({
	value: Number, 
	modified: Date.now 
});

module.exports = mongoose.model('Reading', ReadingSchema);
