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
        if (err) { console.error(err); }
        /*Add.find({campaign: req.body.campaign}, function(err,adds){
            var addArray = adds;
            _.each((addArray),function(value,index){
                if (value._id == req.body.id){
                    console.log(index);
                }
            });           
        });*/
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
        }, function(err, result){
            if(err){console.error(err);}
            res.json(result);
        }
    );
});

module.exports = Router;