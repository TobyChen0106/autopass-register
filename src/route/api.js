const express = require("express");
const router = express.Router();
const User = require('../models/User');
const Card = require('../models/Card');
const Bank = require('../models/Bank');
const Pay = require('../models/Pay');



router.post('/getUserProfile', (req, res) => {
    const userdata = req.body;
    if (userdata.lineID === "") {
        res.json("[ERROR] lineID empty!");
    } else {
        User.findOne({ lineID: userdata.lineID }, (err, userResponse) => {
            if (err) {
                console.log(err);
                res.json("Server User find ID Error." + String(err));
            }
            if (!userResponse) {
                const newUser = new User({
                    lineID: userdata.lineID,
                    displayName: userdata.displayName,
                    userImage: userdata.userImage,
                })
                newUser.save().then(
                    function (updatedDoc, err) {
                        // if update is successful, this function will execute
                        if (err) {
                            console.log(err);
                            res.json(null);
                        } else {
                            res.json(updatedDoc);
                        }
                    }
                );
            }
            else {
                res.json(userResponse)
            }
        })
    }
});

router.get('/getCards', (req, res) => {
    Card.find({}, (err, data) => {
        if (err) {
            console.log(err);
            res.json("Server User find ID Error." + String(err));
        }
        else {
            res.json(data);
        }
    })
});

router.get('/getBanks', (req, res) => {
    Bank.find({}, (err, data) => {
        if (err) {
            console.log(err);
            res.json("Server User find ID Error." + String(err));
        }
        else {
            res.json(data);
        }
    })
});

router.get('/getPays', (req, res) => {
    Pay.find({}, (err, data) => {
        if (err) {
            console.log(err);
            res.json("Server User find ID Error." + String(err));
        }
        else {
            res.json(data);
        }
    })
});

router.get('/getPays', (req, res) => {
    Card.find({}, (err, data) => {
        if (err) {
            console.log(err);
            res.json("Server User find ID Error." + String(err));
        }
        else {
            res.json(data);
        }
    })
});

router.post('/updateUser', (req, res) => {
    const userdata = req.body;
    if (userdata.lineID === "") {
        res.json("[ERROR] lineID empty!");
    } else {
        User.findOneAndUpdate({ lineID: userdata.lineID }, userdata,
            { new: true, upsert: true, useFindAndModify: false },
            (err, userResponse) => {
                if (err) {
                    console.log(err);
                    res.json("Server User find ID Error." + String(err));
                }
                if (!userResponse) {
                    console.log("error empty user findOneAndUpdate!")
                    res.json(userResponse)
                }
                else {
                    res.json(userResponse)
                }
            })
    }
});

module.exports = router;