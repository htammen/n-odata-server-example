var fs = require('fs');
var createObjects = require('./createObjects');

module.exports = function (app, cb) {
	app.dataSources.db.automigrate('Person', function(err) {
		if (err) throw err;
		var Person = app.models.Person;
		var fileContent = fs.readFileSync('storage/sampledata/persons.json', 'utf8');
		var objects = JSON.parse(fileContent);

		createObjects(objects, Person).then(function() {
			cb(null);
		}, function(errCount) {
			cb(errCount);
		});
	});
};
