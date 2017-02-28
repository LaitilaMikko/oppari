/*eslint-env node*/
/*eslint-env browser*/
var mongoose = require("mongoose");

var mediaSchema = new mongoose.Schema({
    name: String,
    url: String,
    thumbUrl: String,
    campaign: String,
    ad: String,
    physUrl: String,
    physThumbUrl: String,
    slots: Number,
    reservedSlots: []
}, { timestamps: true });

module.exports = mongoose.model("medias", mediaSchema);
