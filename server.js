var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var path = require('path');
var fileUpload = require("express-fileupload");
var busboy = require("connect-busboy");

var app = express();
var cors = require("cors");

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload());


app.use(require("./routes/campaign"));
app.use(require("./routes/add"));
app.use(require("./routes/media"));

/*app.get("*", function(req,res){
    res.sendFile();
});*/

app.listen(3000, function () {
    console.log("Appi kuuntelee portista 3000!");
});

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/omaSP");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

});