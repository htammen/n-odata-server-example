var fs = require('fs');
var createObjects = require('./createObjects');

module.exports = function (app, cb) {
	app.dataSources.db.automigrate('Contact', function(err) {
		if (err) throw err;
		var Contact = app.models.Contact;
		var fileContent = fs.readFileSync('storage/sampledata/contacts.json', 'utf8');
		var objects = JSON.parse(fileContent);

		createObjects(objects, Contact).then(function() {
			cb(null);
		}, function(errCount) {
			cb(errCount);
		});

	});
};
