const redis = require("../database/redisClient");
const jwt = require('jsonwebtoken');
const config = require('../config/secret');

const addAdmin = (object) => {
  return new Promise((resolve, reject) => {
    redis.exists(object.email, (err, reply) => {
      if(err)
        resolve({"error" : "Service Unavailable"});

      if(reply === 1){
        resolve({"error" : "Admin already exists"});
      }else{
        redis.set(object.email, object.password, (err, res) => {
          if(err)
            resolve({"error" : "Service Unavailable"});

          resolve({"response" : "Admin credentials added to the database"});
        });
      }
    });
  });
};

const login = (object) => {
  return new Promise((resolve, reject) => {
    let email = object.email;
    redis.get(email, (err, res) => {
      if(err)
        return resolve({"error" : "Service Unavailable"});

      if(res){
        if(res === object.password){
          let token = jwt.sign({email: email},
          config.secret, { expiresIn: '24h'}) // expires in 24hr
          return resolve({
            "response" : {
              "token" : token,
              "admin" : email
            }
          });
        }
        resolve({"error" : "Incorrect Password"});
      }else{
        resolve({"error" : "Admin doesn't exist"});
      }
    });
  });
}

module.exports = {
  addAdmin,
  login
}
