const express = require("express");
const router = express.Router();
const redis = require("redis");
const { addAdmin, login } = require("../controller/authController");

router.post("/addAdmin", async (req, res) => {
  if(req.body && req.body.email && req.body.password){
    res.send(await addAdmin(req.body));
  }
});

router.post("/login", async (req, res) => {
  if(req.body && req.body.email && req.body.password){
    res.send(await login(req.body));
  }
});

module.exports = router;
