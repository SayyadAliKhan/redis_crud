const express = require("express");
const router = express.Router();
const redis = require("redis");
const jwt = require("../services/verify");
const { getUser, addUser, updateUser, deleteUser } = require("../controller/userController");

router.get("/user/:username", jwt.checkToken, async (req, res) => {
  res.send(await getUser(req.params.username));
})

router.post("/user", jwt.checkToken, async (req, res) => {

  var userObj = {
    username: req.body.username,
    address: req.body.address,
    age: req.body.age
  }

  res.send(await addUser(userObj));
});

router.put("/user/:username", jwt.checkToken, async (req, res) => {
  res.send(await updateUser(req.params.username, req.body));
})

router.delete("/user/:username", jwt.checkToken, async (req, res) => {
  res.send(await deleteUser(req.params.username));
})

module.exports = router;
