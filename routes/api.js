const express = require("express");
const router = express.Router();
const redis = require("redis");

router.get("/user/:username", (req, res) => {
    var user = req.params.username;
    redis.get_set({"username" : user}, null, (res) => {
      if(res)
        return res.send({msg : "User found", res : res});

      res.status(500).send({msg : "User was not found"});
    })
})

router.post("/user", (req, res) => {
  var userObj = {
    username: req.body.username,
    address: req.body.address,
    age: req.body.age
  }

  redis.add_set({key : {"username" : userObj.username}, data : userObj}, (res) => {
    if(res)
      return res.send({msg : "User added successfully", res: res});

    res.status(500).send({msg : "Something went wrong"});
  })
});

router.put("/user/:username", (req, res) => {
  res.get_set({username: req.params.username}, req.body, (res) => {
    if(res)
      return res.send({msg : "User updated successfully"});

    res.status(500).send({msg : "Something went wrong"});
  })
})

router.delete("/user/:username", (req, res) => {
  res.delete_set({username : req.params.username}, null, (res) => {
    if(res)
      return res.send({msg : "user has been deleted successfully"});

    res.status(500).send({msg : "Something went wrong"});
  })
})

module.exports = router;
