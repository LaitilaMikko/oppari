var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var cookieparser = require("cookie-parser");

mediaSchema = new mongoose.Schema({
    name: String,
    url: String,
    thumbUrl: String,
    campaign: String,
    ad: String,
    physUrl: String,
    physThumbUrl: String,
    slots: Number
});

var media = module.exports = mongoose.model("medias",mediaSchema);