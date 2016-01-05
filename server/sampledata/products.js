var fs = require('fs');
var createObjects = require('./createObjects');

module.exports = function(app, cb) {
	app.dataSources.db.automigrate('Product', function(err) {
		if (err) throw err;
		var Product = app.models.Product;

		var fileContent = fs.readFileSync('storage/sampledata/products.json', 'utf8');
		var objects = JSON.parse(fileContent);

		createObjects(objects, Product).then(function() {
			cb(null);
		}, function(errCount) {
			cb(errCount);
		});
	});
};
