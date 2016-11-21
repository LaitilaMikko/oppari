var express = require("express");
var mongoose = require("mongoose");
var Router = express.Router();
var Add = require("../Models/add");


Router.post("/addAd", function (req, res) {
    var newAdd = new Add({
        name: req.body.name,
        campaign: req.body.campaign,
        orderNum: req.body.orderNum,
        duration: req.body.duration,
        activated: req.body.activated,
        animationIN: req.body.animationIN,
        animationOut: req.body.animationOut
    });
    newAdd.save(function (err, createdAdd) {
        if (err) { console.error(err); }
        res.json("success");
    });
});

Router.post("/getAdds", function (req, res) {
    Add.find({ campaign: req.body.campaign }, function (err, adds) {
        console.log(adds);
        res.json(adds);
    });
});

module.exports = Router;