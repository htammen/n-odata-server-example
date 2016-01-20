var products = require("../sampledata/products");
var person = require("../sampledata/person");
var customer = require("../sampledata/customers");
var contacts = require("../sampledata/contacts");
var attendees = require("../sampledata/attendees");

module.exports = function(server) {
	// Install a `/` route that returns server status
	var router = server.loopback.Router();
	router.get('/status', server.loopback.status());

	router.get('/sampledata/createproducts', function(req, res, next) {
		products(server).then(function() {
			res.status(200).send('Products are created');
		}, function(err) {
			res.status(500).send(err.join('</br>'));
		})
	});

	router.get('/sampledata/createpeople', function(req, res, next) {
		person(server, function(err) {
			if (err) {
				res.status(500).send("error while creating persons")
			}
			else {
				res.status(200).send('Persons are created');
			}
		});
	});

	router.get('/sampledata/createcustomers', function(req, res, next) {
		customer(server, function(err) {
			if (err) {
				res.status(500).send("error while creating customers")
			}
			else {
				res.status(200).send('Customers are created');
			}
		});
	});

	router.get('/sampledata/createcontacts', function(req, res, next) {
		contacts(server, function(err) {
			if (err) {
				res.status(500).send("error while creating contacts")
			}
			else {
				res.status(200).send('Contacts are created');
			}
		});
	});

	router.get('/sampledata/createattendees', function(req, res, next) {
		attendees(server, function(err) {
			if (err) {
				res.status(500).send("error while creating attendees")
			}
			else {
				res.status(200).send('Attendees are created');
			}
		});
	});

	server.use(router);
};
