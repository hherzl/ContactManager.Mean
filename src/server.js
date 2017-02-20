var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var rest = require("./api");
var api = new rest(app);

var port = 3000;

app.listen(port);

console.log("Server running on port " + port);
