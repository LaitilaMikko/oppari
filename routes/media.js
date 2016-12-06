var express = require("express");
var mongoose = require("mongoose");
var Router = express.Router();
var rmdir = require('rimraf');
var _ = require('underscore');
var mkdirp = require('mkdirp');
var gm = require('gm');
var fs = require('fs');
var media = require("../Models/media");
var videoExt = ["mp4", "webm", "mkv", "ogv"];
var campaign = "fail";
var ad = "fail";

    Router.post("/prepUpload", function(req,res){
        campaign = req.body.campaign;
        ad = req.body.ad;
        res.json({"success": true});
    })

    Router.post("/uploadMedia", function (req, res) {
        var file = req.files.file;
        var filename = file.name;
        var mediaPath = "Medias/" + campaign + "/" + ad;
        var thumbPath = mediaPath+"/thumbnail";
        if (!req.files) {
            res.json({ "success": false });
            return;
        }
        mkdirp(mediaPath, function (err) {
            if (err) {
                res.json({ "success": false });
            }
            filename = filename.replace(/\ /g, "_");
            filename = filename.replace(/\[/g, "_");
            filename = filename.replace(/\]/g, "_");
            var extensionType = filename.split(".")[1];
            var isVideo = extensionType.indexOf(videoExt);
            file.mv(mediaPath+"/"+filename, function (err) {
                if (err) {
                    res.json({ "success": false });
                }
                else {
                    mkdirp(thumbPath, function (err) {
                        if (isVideo > -1) {
                            res.json({ "success": true });
                        } else {
                            gm(mediaPath + "/" + filename).resize(80, 80, '!').write(thumbPath + "/" + filename, function (err) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.json({ "success": true });
                                }
                            });
                        }
                    });
                }
            });
    
        });
        var dir = __dirname.split("routes")[0];
        var newMedia = new media({
            name: filename,
            url: dir+mediaPath+"/"+filename,
            thumbUrl: dir + thumbPath+ "/"+ filename,
            campaign: campaign,
            ad: ad
        })
        newMedia.save(function(err,createdMedia){
            if(err){console.error(err);}
            console.log(createdMedia);
        });


        //res.json({ "success": true });*/
    })

    Router.post("/getMedias", function(req,res){
        var currCamp = req.body.campaign;
        var currAd = req.body.ad;
        media.find({
            campaign: currCamp,
            ad: currAd
        },function(err,result){
            if(err){console.log(err);}
            res.json(result);
        })
    })

    module.exports = Router;