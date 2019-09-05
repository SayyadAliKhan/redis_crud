const redis = require("../database/redisClient");

const getUser = (username) => {
  return new Promise((resolve, reject) => {
    redis.get(username, (err, res) => {
      if(err)
        return resolve({"error" : "Service Unavailable"});

      if(res){
        resolve({"response" : JSON.parse(res)});
      }else{
        resolve({"error" : "User not found"});
      }
    })
  })
};

const addUser = (userObj) => {
  return new Promise((resolve, reject) => {
    redis.exists(userObj.username, (err, reply) => {
      if(err)
        return resolve({"error" : "Service Unavailable"});

      if(reply === 1){
        resolve({"error" : "User already exists"});
      }else{

      redis.set(userObj.username, JSON.stringify(userObj), (err, res) => {
        if(err)
          return resolve({"error" : "Service Unavailable"});

          resolve({"response" : "User added to the database"});
      });

      }
    })
  })
};

const updateUser = (username, userObj) => {
  return new Promise((resolve, reject) => {
    redis.exists(username, (err, reply) => {
      if(err)
        return resolve({"error" : "Service Unavailable: "})

      if(reply === 1){
        redis.exists(userObj.username, (err, newRepy) => {

          if(err)
            return resolve({"error" : "Service Unavailable: "})

          if(reply === 1 && username !== userObj.username){
            return resolve({"error" : "User already exists"});
          }else{

            redis.del(username, (err, delReply) => {

              if(err)
                return resolve({"error" : "Service Unavailable: "})

              if(delReply === 1){
                redis.set(userObj.username, JSON.stringify(userObj), (err, res) => {

                  if(err)
                    return resolve({"error" : "Service Unavailable"});

                    resolve({"response" : "User details has been updated"});
                });
              }
            })
          }
        })
      }else{
        resolve({"error" : "User doesn't exist"});
      }
    })
  })
};

const deleteUser = (username) => {
  return new Promise((resolve, reject) => {
    redis.del(username, (err, reply) => {

      if(err)
        return resolve({"error" : "Service Unavailable"});

      if(reply === 1){
        resolve({"response" : "User deleted"});
      }else{
        resolve({"error" : "User doesn't exist"});
      }
    })
  })
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser
};
