/*eslint-env node*/
/*eslint-env browser*/
var express = require("express");
var Router = express.Router();
var Campaign = require("../Models/campaign");
var Add = require("../Models/add");
var _ = require("underscore");
var rmdir = require('rimraf');
var Media = require("../Models/media");
var fs = require("fs");

//Kampanjan lisääminen
Router.post("/addCampaign", function (req, res) {
    Campaign.findOne({ name: req.body.name }, function (err, campaign) {
        if (campaign == null) {
            var newCampaign = new Campaign({
                name: req.body.name,
                screens: req.body.screens,
                screen_width: req.body.screen_width,
                screen_height: req.body.screen_height,
                display_w: req.body.displayW,
                display_h: req.body.displayH
            });
            newCampaign.save(function (err, createdCampaign) {
                if (err) return console.error(err);
                res.json("success");
            });
        } else {
            res.send("Löytyy jo");
        }
    });
});

//Kaikkien kampanjoiden haku
Router.get("/getCampaigns", function (req, res) {
    Campaign.find(function (err, oldCampaigns) {
        if (err) console.error(err);
        return res.json(oldCampaigns);
    });
});

Router.post("/getLatestID", function (req, res) {
    Campaign.find({ name: req.body.name }, function (err, newCampaign) {
        if (err) console.error(err);
        return res.json(newCampaign[0]._id);
    });
});

//Kampanjan poistaminen
Router.post("/deleteCampaign", function (req, res) {
    Campaign.findOne({ _id: req.body.id }, function (err, campaign) {
        var dir = __dirname.split("routes")[0];
        var path = dir + "Medias/";
        if (err) {console.error(err);}
        campaign.remove();
        rmdir(path + campaign.name, function (err, dirs, files) {
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
    });
    res.json("success");
});

Router.post("/deleteCampaignAdds", function (req, res) {
    Add.find({ campaign: req.body.campaign }, function (err, result) {
        _.each(result, function (ad) {
            ad.remove();
        });
    });
    res.json("success");
});

Router.post("/deleteCampaignMedia", function (req, res) {
    Media.find({ campaign: req.body.campaign }, function (err, found) {
        _.each(found, function (media) {
            media.remove();
        });
    });
    res.json("success");
});

module.exports = Router;
