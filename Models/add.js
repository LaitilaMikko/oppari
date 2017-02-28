/*eslint-env node*/
/*eslint-env browser*/
var mongoose = require("mongoose");

var addSchema = new mongoose.Schema({
    name: String,
    campaign: String,
    orderNum: Number,
    duration: Number,
    activated: Boolean,
    animationIN: String,
    animationOut: String
}, { timestamps: true });

module.exports = mongoose.model("adds", addSchema);
