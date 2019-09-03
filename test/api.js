const mongoose = require("mongoose");
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
chai.use(chaiHttp);

describe('user-test', function(){

  it("if app's working", () => {})

  describe('test-get-request', () => {
    it('it should expect 404', (done) => {
          chai.request('http://localhost:3000')
              .get('/user')
              .end((err, res) => {
                    res.should.have.status(404);
                done();
              });
    });

    it('it should get user', (done) => {
        chai.request('http://localhost:3000')
            .get('/user/sayyad')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.should.have.lengthOf(1);
              done();
            });
    });

    it("should not get a single record", (done) => {
           const id = "Sayyad";
           chai.request(app)
               .get(`/${id}`)
               .end((err, res) => {
                   res.should.have.status(500);
                   done();
                });
       });
  })

  describe('test-post', () => {
    it('should send 200 to : /user POST', function(done) {
      chai
          .request(app)
          .post('/user')
          .set('content-type', 'application/json')
          .send({
            username: "sayyad",
            address: "colaba",
            age: 24
          })
          .end(function(error, res, body) {
              if (error) {
                  done(error);
              } else {
                 res.should.have.status(200);
                 res.res.should.be.json;
                 res.res.should.be.a('object');
                done();
              }
          });
  });
  })

  describe('test-put', () => {
    it('should update a SINGLE record', function(done) {
      chai.request(server)
        .put('/blob/sayyad')
        .send({
          username: "sayyad",
          address: "colaba",
          age: 26
        })
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          done();
      });
    });
  });

it('should update a SINGLE record', function(done) {
  chai.request(server)
    .put('/user/sayyad')
    .send({
      username: "sayyad",
      address: "colaba",
      age: 26
    })
    .end(function(error, response){
      response.should.have.status(200);
      response.should.be.json;
      done();
  });
})

it('should not update a record', function(done) {
  chai.request(server)
    .put('/user/sayyad')
    .send({
      username: "sayyad1",
      address: "colaba",
      age: 26
    })
    .end(function(error, response){
      response.should.have.status(500);
      done();
  });
})

});
