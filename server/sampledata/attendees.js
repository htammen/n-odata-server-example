var fs = require('fs');
var createObjects = require('./createObjects');

module.exports = function (app, cb) {
	app.dataSources.db.automigrate('Attendee', function(err) {
		if (err) throw err;
		var Attendee = app.models.Attendee;
		var fileContent = fs.readFileSync('storage/sampledata/attendees.json', 'utf8');
		var objects = JSON.parse(fileContent);

		createObjects(objects, Attendee).then(function() {
			cb(null);
		}, function(errCount) {
			cb(errCount);
		});

	});
};
