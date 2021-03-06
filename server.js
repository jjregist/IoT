


// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

//configure jade and views
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://e5user:d850mv20@ds031852.mongolab.com:31852/e5datastore'); // connect to our database
var Bear     = require('./app/models/bear');
var Reading = require('./app/models/reading'); //pull in the Reading Schema 

// ROUTES FOR OUR API
// =============================================================================

// create our router for the api
var apirouter = express.Router();

//create a router for the web applciation; 
var webrouter = express.Router();

//web routes for web stuff  
webrouter.use(function(req,res,next) {
	console.log('Web router has been called.');
	next();
});

webrouter.get('/', function(req, res) {
	res.render('index');	
});

app.use('/', webrouter);





// middleware for all api requests
apirouter.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
apirouter.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

apirouter.route('/readings')

	// create a reading (accessed at POST http://localhost:8080/readings)
	.post(function(req, res) {
		
		var reading = new Reading();		// create a new instance of the Reading model
		reading.value = parseFloat(req.body.value);  // set the bears name (comes from the request)
		reading.hid = req.body.hid;
		reading.battery = req.body.battery;

		reading.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'reading created!' });
		});
	}) 

//request all readings by a certain ID
apirouter.route('/readings/:hid')

	.get(function(req, res) {
		Reading.find({hid:req.params.hid}, function(err,readings){
			if (err)
				res.send(err);
			res.json(readings);
		});
			 
	});
	  
// REGISTER OUR ROUTES -------------------------------
app.use('/api', apirouter);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

