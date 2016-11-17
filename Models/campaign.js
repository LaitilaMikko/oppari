var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var cookieparser = require("cookie-parser");

campaignSchema = new mongoose.Schema({
    name: String,
    screens: Number,
    screen_width: Number,
    screen_height: Number
});

var campaign = module.exports = mongoose.model("campaigns",campaignSchema);