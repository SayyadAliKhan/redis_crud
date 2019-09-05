const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const should = chai.should();
const { addAdmin, login } = require('../controller/authController');
const { deleteUser, addUser } = require('../controller/userController');
chai.use(chaiHttp);

describe('user-test', function(){
  const admin = {email : "sayyadali40@gmail.com", password : "sayyad123"}
  const user = {username: "sayyad", address: "colaba", age: 24}

  before(async ()=> {
      //get token
      await addAdmin(admin);
      let resToken =  await login(admin);
      token = resToken.response.token;
    })

  it("if app's working", () => {})

  describe('test-security', () => {
    it('return auth token invalid', (done) => {
        chai.request('http://localhost:3000')
            .get('/api/user/sultan')
            .set('authorization', token + "--")
            .end((err, res, body) => {
                res.body.success.should.eql(false);
                res.body.message.should.eql("Auth Token is not valid");
              done();
            });
    });

    it('return auth token not supplied', (done) => {
        chai.request('http://localhost:3000')
            .get('/api/user/sultan')
            .end((err, res, body) => {
                res.body.success.should.eql(false);
                res.body.message.should.eql("Auth token is not supplied");
              done();
            });
    });
  });

  describe('test-post', () => {
    it('user added to the database', function(done) {
      chai
          .request(app)
          .post('/api/user')
          .set('content-type', 'application/json')
          .set('authorization', token)
          .send(user)
          .end(function(error, res) {
              if (error) {
                  done(error);
              } else {
                 res.body.should.have.property("response");
                 res.body.response.should.eql("User added to the database");
                done();
              }
          });
      });

    it('user already exist in the database', function(done) {
        chai
            .request(app)
            .post('/api/user')
            .set('content-type', 'application/json')
            .set('authorization', token)
            .send(user)
            .end(function(error, res) {
                if (error) {
                    done(error);
                } else {
                   res.body.should.not.have.property("response");
                   res.body.error.should.eql("User already exists");
                  done();
                }
            });
        });
  })

  describe('test-get', () => {

    it('it should expect 404', (done) => {
        chai.request('http://localhost:3000')
            .get('/api/')
            .set('authorization', token)
            .end((err, res) => {
                res.body.should.eql({});
                res.status.should.eql(404);
              done();
            });
    });

    it('it should get user', (done) => {
        chai.request('http://localhost:3000')
            .get('/api/user/'+ user.username)
            .set('authorization', token)
            .end((err, res) => {
                  res.body.should.have.property("response");
              done();
            });
    });

    it("User not found", (done) => {
           const username = "Sayyad";
           chai.request(app)
               .get(`/api/user/${username}`)
               .set('authorization', token)
               .end((err, res) => {
                   res.body.should.not.have.property("response");
                   res.body.error.should.eql("User not found");
                   done();
                });
       });
  })

  describe('test-put', () => {
    const otheruser = {username: "sultan", address: "navy nagar", age: 24}

    before(async () => {
      await addUser(otheruser);
    });

    it('should update a SINGLE record', function(done) {
      chai.request(app)
        .put('/api/user/sayyad')
        .set('authorization', token)
        .send({
          username: "sayyad",
          address: "colaba",
          age: 29
        })
        .end(function(error, res){
          res.body.should.have.property("response");
          done();
      });
    });

    it('should not update a SINGLE record', function(done) {
      chai.request(app)
        .put('/api/user/sayyad1')
        .set('authorization', token)
        .send({
          username: "sayyad",
          address: "colaba",
          age: 29
        })
        .end(function(error, res){
          res.body.should.not.have.property("response");
          res.body.error.should.eql("User doesn't exist");
          done();
      });
    });

    it('User already exists', function(done) {
      chai.request(app)
        .put('/api/user/sayyad')
        .set('authorization', token)
        .send({
          username: "sultan",
          address: "colaba",
          age: 29
        })
        .end(function(error, res){
          res.body.should.not.have.property("response");
          res.body.error.should.eql("User already exists");
          done();
      });
    });

    after(async () => {
      await deleteUser(otheruser.username);
    })

  });

  describe('test-delete', () => {

    it('should delete a SINGLE record', function(done) {
      chai.request(app)
        .delete('/api/user/sayyad')
        .set('authorization', token)
        .end(function(error, res){
          res.body.should.have.property("response");
          done();
      });
    });

    it("User doesn't exist", function(done) {
      chai.request(app)
        .delete('/api/user/sayyad')
        .set('authorization', token)
        .end(function(error, res){
          res.body.should.not.have.property("response");
          res.body.error.should.eql("User doesn't exist");
          done();
      });
    });

  });

  after(async () => {
    await deleteUser(user.username);
  });

});
