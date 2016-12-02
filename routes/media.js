var express = require("express");
var mongoose = require("mongoose");
var Router = express.Router();
var rmdir = require('rimraf');
var _ = require('underscore');
var mkdirp = require('mkdirp');
var bodyparser = require("body-parser")
var gm = require('gm');
var fs = require('fs');

//var gm = require('gm');

var videoExt = ["mp4", "webm", "mkv", "ogv"];

Router.post("/uploadMedia", function (req, res) {
    console.log(req.files);
    var campaign = "testi";
    var ad = "testi";
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
    //res.json({ "success": true });
})

module.exports = Router;