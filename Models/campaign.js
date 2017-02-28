/*eslint-env node*/
/*eslint-env browser*/
var mongoose = require("mongoose");


var campaignSchema = new mongoose.Schema({
    name: String,
    screens: Number,
    screen_width: Number,
    screen_height: Number
}, { timestamps: true });

module.exports = mongoose.model("campaigns", campaignSchema);
