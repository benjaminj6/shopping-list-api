var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('GET request on /items', function() {
  it('valid endpoint should return status 200 and list of items', function(done) {
  	chai.request(app)
  		.get('/items')
  		.end(function(err, res) {
  			should.equal(err, null);
  			res.should.have.status(200);
  			res.should.be.json;
  			res.body.should.be.a('array');
  			res.body.length.should.equal(storage.items.length);
  			done();
  		});	
  });

  it('invalid endpoint should return 404 error', function(done) {
  	chai.request(app)
  		.get('/aaaaa')
  		.end(function(err, res) {
  			err.should.have.status(404);
  			done();
  		});
  });
});

describe('POST request on /items', function() {
	it('valid request should return 201 and added item', function(done) {
		chai.request(app)
			.post('/items')
			.send({'name': 'chocolate'})
			.end(function(err, res) {
				should.equal(err, null);
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				storage.items.length.should.equal(4);
				storage.items[3].should.have.property('name');
				storage.items[3].name.should.equal('chocolate');
				storage.items[3].id.should.equal(3);
				done();
			});
	});

	it('request with no body should return 400 error', function(done) {
		chai.request(app)
			.post('/items')
			.send('asdfasdf')
			.end(function(err, res) {
				err.should.have.status(400);
				done();
			});
	});
});













