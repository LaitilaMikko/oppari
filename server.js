/*eslint-env node*/
/*eslint-env browser*/
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var path = require('path');
var fileUpload = require("express-fileupload");

var app = express();
var cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload());

app.use(express.static("./client/public"));
app.use(express.static("Medias"));


app.use(require("./routes/campaign"));
app.use(require("./routes/add"));
app.use(require("./routes/media"));

app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname) + "/client/public/index.html");
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
