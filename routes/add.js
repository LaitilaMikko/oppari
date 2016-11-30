var express = require("express");
var mongoose = require("mongoose");
var Router = express.Router();
var Add = require("../Models/add");
var _ = require("underscore");


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
        res.json(createdAdd);
    });
});

Router.post("/getAdds", function (req, res) {
    Add.find({ campaign: req.body.campaign }, function (err, adds) {
        res.json(adds);
    });
});

Router.post("/deleteAdd", function (req, res) {
    Add.findOne({ _id: req.body.id }, function (err, deleteAdd) {
        console.log("ID: " + req.body.id + ", Deleting: " + deleteAdd);
        if (err) { console.error(err); }
        deleteAdd.remove();
        res.json("success");
    });
});

Router.post("/updateAdd", function (req, res) {
    Add.update(
        { _id: req.body.id },
        {
            $set:
            {
                name: req.body.name,
                campaign: req.body.campaign,
                duration: req.body.duration,
                activated: req.body.activated,
                animationIN: req.body.animationIN,
                animationOut: req.body.animationOut
            }
        }, function (err, result) {
            if (err) { console.error(err); }
            res.json(result);
        }
    );
});

Router.post("/addOrderUpOrDown", function (req, res) {
    console.log(req.body);
    var add1ID = req.body.add1;
    var add2ID = req.body.add2;
    var action = req.body.action;
    var add1OrderNum = req.body.add1OrderNum;
    var add2OrderNum = req.body.add2OrderNum;
    Add.update(
        { _id: add1ID },
        {
            $set:
            {
                orderNum: add1OrderNum
            }
        }, function (err, result) {
            if (err) { console.error(err); }
        }
    )
    Add.update(
        { _id: add2ID },
        {
            $set:
            {
                orderNum: add2OrderNum
            }
        }, function (err, result) {
            if (err) { console.error(err); }
        }
    )
    res.json("success");
});


module.exports = Router;