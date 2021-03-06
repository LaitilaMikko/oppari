/*eslint-env node*/
/*eslint-env browser*/
var express = require("express");
var Router = express.Router();
var Add = require("../Models/add");
var _ = require("underscore");
var rmdir = require('rimraf');
var Media = require("../Models/media");
var fs = require("fs");


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
        deleteAdd.remove();
        var dir = __dirname.split("routes")[0];
        var path = dir + "Medias/";
        if (err) { console.error(err); }
        rmdir(path + deleteAdd.campaign + "/" + deleteAdd.name, function (err, dirs, files) {
            if (files) {
                _.each(files, function (file) {
                    fs.unlink(file);
                });
            }
            if (dirs) {
                _.each(dirs, function (dir) {
                    rmdir(dir);
                });
            }
        });
        res.json(deleteAdd);
    });
});

Router.post("/addOrderNumsAfterDel", function (req, res) {
    Add.find({ campaign: req.body.campaign }, function (err, adds) {
        _.each(adds, function (ad) {
            if (ad.orderNum > req.body.orderNum) {
                var newOrder = ad.orderNum - 1;
                updateOrders(ad._id, newOrder);
            }
        });
    });
    res.json("success");
});

function updateOrders (id, orderNum) {
    Add.update(
        { _id: id },
        {
            $set: { orderNum: orderNum }
        }, function (err, result) {
            if (err) { console.error(err); }
        }
    );
}

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
    var add1ID = req.body.add1;
    var add2ID = req.body.add2;
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
    );
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
    );
    res.json("success");
});

Router.post("/deleteAdMedias", function (req, res) {
    Media.find({ ad: req.body.adName, campaign: req.body.campaign }, function (err, found) {
        _.each(found, function (ad) {
            ad.remove();
        });
        res.json("Success");
    });
});


module.exports = Router;
