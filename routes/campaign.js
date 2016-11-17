var express = require("express");
var mongoose = require("mongoose");
var Router = express.Router();
var Campaign = require("../Models/campaign");

//Kampanjan lisääminen
Router.post("/addCampaign", function (req, res) {
    Campaign.findOne({ name: req.body.name }, function (err, campaign) {
        console.log(campaign);
        if (campaign == null) {
            var newCampaign = new Campaign({
                name: req.body.name, 
                screens: req.body.screens, 
                screen_width: req.body.screen_width, 
                screen_height: req.body.screen_height 
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
Router.get("/getCampaigns",function(req,res){
    Campaign.find(function(err,oldCampaigns){
        if(err) console.error(err);
        return res.json(oldCampaigns);
    });
});

//Kampanjan poistaminen
Router.post("/deleteCampaign",function(req,res){
    Campaign.find({_id:req.body.id}).remove(function(){
        res.json("success");
    });
});

module.exports = Router;