var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('GET request on /items', function() {
  it('valid request should return list of items', function(done) {
  	chai.request(app)
  		.get('/items')
  		.end(function(err, res) {
  			console.log('this happened');
  			done();
  		});	
  });
});