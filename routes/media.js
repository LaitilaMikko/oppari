var express = require("express");
var mongoose = require("mongoose");
var Router = express.Router();
var rmdir = require('rimraf');
var _ = require('underscore');
var mkdirp = require('mkdirp');
var gm = require('gm');
var fs = require('fs');
var media = require("../Models/media");
var _ = require("underscore");
var videoExt = ["mp4", "webm", "mkv", "ogv"];

var config = require("../client/public/config.js");

/*Router.post("/prepUpload", function (req, res) {
    campaign = req.body.campaign;
    ad = req.body.ad;
    res.json({ "success": true });
})*/

Router.post("/uploadMedia", function (req, res) {
    var campaign = req.headers.campaign;
    var ad = req.headers.ad;
    var file = req.files.file;
    var filename = file.name;
    var sWidth = req.headers.swidth;
    var sHeight = req.headers.sheight;
    var slots;
    var mediaPath = "Medias/" + campaign + "/" + ad;
    var thumbPath = mediaPath + "/thumbnail";

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
        file.mv(mediaPath + "/" + filename, function (err) {
            if (err) {
                res.json({ "success": false });
            }
            else {
                gm(mediaPath + "/" + filename).size(function (err, size) {
                    if (err) { console.error(err); }
                    var mWidth = size.width;
                    var mHeight = size.height;
                    if (mHeight != sHeight) {
                        res.json({ "success": false, "reason": "Bad media Height!" });
                        fs.unlink(mediaPath + "/" + filename);
                    } else if ((mWidth % sWidth) != 0) {
                        res.json({ "success": false, "reason": "Bad media Width!" });
                        fs.unlink(mediaPath + "/" + filename);
                    } else {
                        slots = mWidth / sWidth;
                        mkdirp(thumbPath, function (err) {
                            if (isVideo > -1) {
                            } else {
                                gm(mediaPath + "/" + filename).resize(80, 80, '!').write(thumbPath + "/" + filename, function (err) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        var dir = __dirname.split("routes")[0];
                                        var newMedia = new media({
                                            name: filename,
                                            url: config.httpServer + campaign + "/" + ad + "/" + filename,
                                            thumbUrl: config.httpServer + campaign + "/" + ad + "/thumbnail/" + filename,
                                            physUrl: dir + mediaPath + "/" + filename,
                                            physThumbUrl: dir + thumbPath + "/" + filename,
                                            campaign: campaign,
                                            ad: ad,
                                            slots: slots
                                        })
                                        newMedia.save(function (err, createdMedia) {
                                            if (err) { console.error(err); }
                                            res.json({ "success": true, "data": createdMedia });
                                        });
                                    }
                                });
                            }
                        });
                    }
                });

            }
        });

        //BACKUPPI URLEILLE TESTIÄ VARTEN:
        /*
            url: dir + mediaPath + "/" + filename,
            thumbUrl: dir + thumbPath + "/" + filename,
        */

    });
})

Router.post("/getMedias", function (req, res) {
    var currCamp = req.body.campaign;
    var currAd = req.body.ad;
    media.find({
        campaign: currCamp,
        ad: currAd
    }, function (err, result) {
        if (err) { console.error(err); }
        res.json(result);
    })
})

Router.post("/deleteMedia", function (req, res) {
    var id = req.body.id
    media.findOne({ _id: id }, function (err, found) {
        if (err) { console.error(err); }
        if (found) {
            fs.unlink(found.physUrl);
            fs.unlink(found.physThumbUrl);
            found.remove();
            res.json(found);
        }
    });
})

Router.post("/reserveMediaSlots", function (req, res) {
    var updated = req.body.medias;
    var campaign = req.body.campaign;
    var ad = req.body.ad;
    var medias = [];
    media.find({
        campaign: campaign,
        ad: ad
    }, function (err, result) {
        if (err) { console.error(err); }
        _.each(updated, function (newMedia) {
            _.each(result, function (oldMedia) {
                if (newMedia._id == oldMedia._id) {
                    if (newMedia.reservedSlots.length > 0) {
                        oldMedia.reservedSlots = newMedia.reservedSlots;
                        oldMedia.save(function (err, result) {
                            if (err) {
                                console.error(err);
                                res.json({"success": false});
                            }
                        });
                    }
                }
            })
        })
        res.json({"success":true});   
    })
})

Router.post("/eraseSlots", function(req,res){
    var campaign = req.body.campaign;
    var ad = req.body.ad;
    media.find({
        campaign: campaign,
        ad: ad
    },function(err,result){
        if(err){
            console.error(err)
            res.json({"success": false});
        }
        _.each(result, function(media){
            media.reservedSlots = [];
            media.save(function(err,result){
                if(err){
                    console.error(err);
                    res.json({"success": false});
                }
            })
        });
        res.json({"success": true});
    });
});

/*Router.post("/reserveMediaSlots",function(req,res){
    var id = req.body.id;
    var slots = req.body.slots;
    media.findOne({_id:id}, function(err,found){
        if(err){console.error(err);}
        if(found){
            media.update(
                {_id:id},
                {
                    $set:
                    {
                        reservedSlots: slots
                    }
                },function(err){
                    if(err){ console.error(err);}
                }
            )
        }
    })
})*/



module.exports = Router;