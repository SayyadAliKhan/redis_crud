const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/api");
const auth = require("./routes/auth");
const helmet = require('helmet');
const port = process.env.PORT || 3000;
const redis = require("./database/redisClient");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(helmet());

app.use("/auth", auth);
app.use("/api", user);

redis.on('connect', function() {
  console.log('Redis client connected');
  app.listen(port, (err) => {
    if(err)
      console.log("Something went wrong");

      console.log("Server listening on port : "+ port);
  })
});

redis.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

module.exports = app;
