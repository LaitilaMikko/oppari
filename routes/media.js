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


Router.post("/prepUpload", function (req, res) {
    campaign = req.body.campaign;
    ad = req.body.ad;
    res.json({ "success": true });
})

Router.post("/uploadMedia", function (req, res) {
    var campaign = req.headers.campaign;
    var ad = req.headers.ad;
    var file = req.files.file;
    var filename = file.name;
    var sWidth = req.headers.swidth;
    var sHeight = req.headers.sheight;

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
                mkdirp(thumbPath, function (err) {
                    if (isVideo > -1) {
                    } else {
                        gm(mediaPath + "/" + filename).resize(80, 80, '!').write(thumbPath + "/" + filename, function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(countSlots(mediaPath + "/" + filename));
                                var dir = __dirname.split("routes")[0];
                                var newMedia = new media({
                                    name: filename,
                                    url: "http://192.168.1.2:2020/"+campaign+"/"+ad+"/"+filename,
                                    thumbUrl: "http://192.168.1.2:2020/"+campaign+"/"+ad+"/thumbnail/"+filename,
                                    physUrl: dir + mediaPath + "/" + filename,
                                    physThumbUrl: dir + thumbPath + "/" + filename,
                                    campaign: campaign,
                                    ad: ad
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

function checkMedia(mediaPath, sWidth, sHeight) {
    gm(mediaPath).identify(function (err, data) {
        if (err) { console.error(err); }
        var mWidth = data.size.width;
        var mHeight = data.size.height;
        var testi = sWidth % mWidth;
        console.log(testi);
        /*if (mHeight != sHeight){

        }else if()*/
    })
}

function countSlots(mediaPath, sWidth) {
    var slots = 0;
    gm(mediaPath).identify((err, data) => {
        if (err) { console.error(err); }
        var mWidth = data.size.width;
        slots = mWidth / sWidth;
    })
    return slots;
}

module.exports = Router;