module.exports = function (objects, ModelClass) {
	return new Promise( function(resolve, reject) {
		var errCount = 0;
		objects.forEach(function (obj, idx) {
			ModelClass.create(obj).then(function(object) {
				console.log(ModelClass.definition.name, object);
			}, function(err) {
				errCount++;
			});
		});
		if(errCount > 0) {
			reject(errCount);
		} else {
			resolve();
		}
	})
};
