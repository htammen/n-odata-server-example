var lt = require('loopback-testing');
var expect = require("chai").expect;
var app = require('../server/server.js');

describe('/odata/', function () {
	lt.beforeEach.withApp(app);
	lt.describe.whenCalledRemotely('GET', '/odata/', function () {
		lt.it.shouldBeAllowed();
		it('should have statusCode 200', function () {
			expect(this.res.statusCode).to.equal(200);
		})
		it('should be json', function () {
			expect(this.res).to.be.json;
		})
	});
});
