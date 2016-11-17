var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var path = require('path');

var app = express();
var cors = require("cors");

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(require("./routes/campaign"));

app.get("*", function(req,res){
    res.sendFile(path.resolve(__dirname,"client/public","index.html"));
});

app.listen(3000, function () {
    console.log("Appi kuuntelee portista 3000!");
});

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/omaSP");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

});