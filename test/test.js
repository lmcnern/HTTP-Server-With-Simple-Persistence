'use strict';

var fs = require('fs');
var server = require('../server.js');
var chai = require('chai');
var expect = require('chai').expect;
var chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

//POST test
describe('server.js', function() {
  it('should create a new file with POST', function(done) {
    chai.request('http://localhost:8888')
      .post('/data/notes')
      .send({"name":"bob", "note":"beep"})
      .end(function(err, res) {
        expect(err).to.eql(null);
        done();
    });
  });
//GET test
  it('should GET all notes', function(done) {
    chai.request('http://localhost:8888')
        .get('/data/notes')
        .end(function(err, res) {
          expect(err).to.eql(null);
          done();
        });
    });
});

