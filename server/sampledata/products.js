var fs = require('fs');
var createObjects = require('./createObjects');

module.exports = new Promise(function (resolve, reject) {

})

/**
 * Creates products and a productDetail for each product
 */
module.exports = function (app) {
	return new Promise(function (resolve, reject) {
		app.dataSources.db.automigrate(['Category', 'Product', 'ProductDetail'], function (err) {
			if (err) throw err;
			var Product = app.models.Product;
			var Category = app.models.Category;

			var categoryContent = fs.readFileSync('storage/sampledata/categories.json', 'utf8');
			var categories = JSON.parse(categoryContent);

			var fileContent = fs.readFileSync('storage/sampledata/products.json', 'utf8');
			var objects = JSON.parse(fileContent);

			var obj;
			var arrCategories = [];

			var promiseCategory = new Promise(function (resolve, reject) {
				categories.forEach(function (category) {
					Category.create(category).then(function (newCategory) {
						console.log('Category: ' + newCategory);
						arrCategories.push(newCategory);
						if (arrCategories.length === categories.length) {
							resolve();
						}
					})
				});
			});


			promiseCategory.then(function () {
				new Promise(function (resolve, reject) {
					var productsCount = 0;
					var arrErrors = [];

					var checkFuncEnd = function() {
						productsCount++;
						if (productsCount === objects.length) {
							resolve(arrErrors);
						}
					};

					for (var i = 0; i < objects.length; i++) {
						obj = objects[i];
						Product.create(obj).then(
							function (object) {
								// product created successfully. Create a ProductDetail now
								var detailText = object.Name + '_Detail';
								object['ProductDetails'].create({
									'Details': detailText
								}).then(
									function (objDetail) {
										console.log('ProductDetails: ', objDetail);
										console.log(Product.definition.name, object);
										checkFuncEnd();
									},
									function (err) {
										arrErrors.push(err);
										console.error(err);
										checkFuncEnd();
									}
								);
							},
							function (err) {
								arrErrors.push(err);
								checkFuncEnd();
							}
						)
					}
				}).then(function (arrErrors) {
					if (arrErrors.length > 0) {
						console.error("Promise.all succeeded with " + arrErrors.length + " errors");
						reject(arrErrors);
					}
					else {
						resolve();
					}
				})
			});


			//Promise.all(arrPromises).then(function() {
			//	if (arrErrors.length > 0) {
			//		console.error("Promise.all succeeded with " + arrErrors.length + " errors");
			//		reject(arrErrors);
			//	}
			//	else {
			//		resolve();
			//	}
			//}, function(err) {
			//	console.error("Promise.all failed");
			//	reject(err);
			//});

		});


		/*		createObjects(objects, Product).then(function() {
		 cb(null);
		 }, function(errCount) {
		 cb(errCount);
		 });
		 */
	});
};
