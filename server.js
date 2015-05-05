// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

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

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

router.route('/readings')

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

router.route('/readings/:reading_hid')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
	.get(function(req, res) {
	       res.json({ message: 'you requested the readings from a device' });
	        });



router.route('/bears')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
		
		var bear = new Bear();		// create a new instance of the Bear model
		bear.name = req.body.name;  // set the bears name (comes from the request)

		bear.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Bear created!' });
		});

		
	})



// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

