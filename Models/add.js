var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var cookieparser = require("cookie-parser");

addSchema = new mongoose.Schema({
    name: String,
    campaign: String,
    orderNum: Number,
    duration: Number,
    activated: Boolean,
    animationIN: String,
    animationOut: String
},{timestamps: true});

var add = module.exports = mongoose.model("adds",addSchema);