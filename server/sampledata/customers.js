var fs = require('fs');
var createObjects = require('./createObjects');

module.exports = function (app, cb) {
	app.dataSources.db.automigrate('Customer', function(err) {
		if (err) throw err;
		var Customer = app.models.Customer;
		var fileContent = fs.readFileSync('storage/sampledata/customers.json', 'utf8');
		var objects = JSON.parse(fileContent);

		createObjects(objects, Customer).then(function() {
			cb(null);
		}, function(errCount) {
			cb(errCount);
		});
	});
};
