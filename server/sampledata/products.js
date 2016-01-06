var fs = require('fs');
var createObjects = require('./createObjects');

module.exports = new Promise(function(resolve, reject) {

})

/**
 * Creates products and a productDetail for each product
 */
module.exports = function(app) {
	return new Promise(function(resolve, reject) {
		app.dataSources.db.automigrate(['Product', 'ProductDetail'], function(err) {
			if (err) throw err;
			var Product = app.models.Product;

			var fileContent = fs.readFileSync('storage/sampledata/products.json', 'utf8');
			var objects = JSON.parse(fileContent);

			var obj;
			var arrPromises = [];
			var arrErrors = [];
			for(var i=0; i<objects.length; i++) {
				obj = objects[i];
				arrPromises.push(Product.create(obj).then(
					function(object) {
						// product created successfully. Create a ProductDetail now
						var detailText = object.Name + '_Detail';
						object['details'].create({
							'Details': detailText
						}).then(
							function(objDetail) {
								console.log('Details: ', objDetail);
								console.log(Product.definition.name, object);
							},
							function(err) {
								arrErrors.push(err);
								console.error(err);
							}
						);
					},
					function(err) {
						arrErrors.push(err);
					})
				)
			}

			Promise.all(arrPromises).then(function() {
				if (arrErrors.length > 0) {
					console.error("Promise.all succeeded with " + arrErrors.length + " errors");
					reject(arrErrors);
				}
				else {
					resolve();
				}
			}, function(err) {
				console.error("Promise.all failed");
				reject(err);
			});

		});


		/*		createObjects(objects, Product).then(function() {
					cb(null);
				}, function(errCount) {
					cb(errCount);
				});
		*/
	});
};
