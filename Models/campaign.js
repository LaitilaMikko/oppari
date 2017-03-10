/*eslint-env node*/
/*eslint-env browser*/
var mongoose = require("mongoose");


var campaignSchema = new mongoose.Schema({
    name: String,
    screens: Number,
    screen_width: Number,
    screen_height: Number,
    display_w: Number,
    display_h: Number
}, { timestamps: true });

module.exports = mongoose.model("campaigns", campaignSchema);
