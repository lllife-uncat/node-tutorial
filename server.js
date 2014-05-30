var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var route = require("./server/route");

var app = express();
var port = 8888;

app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(bodyParser());
app.use(methodOverride());

route(app);

app.listen(port);
console.log("magick start @" + port);
