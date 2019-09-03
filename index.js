const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/api");
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use("/api", user);

app.listen(port, (err) => {
  if(err)
    console.log("something went wrong");

    console.log("connected to the server");
})
