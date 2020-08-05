
var express = require('express');
var router = express.Router();

var Song = require('../models/song')
// const parser = require('./../config/cloudinary');

const cloudinaryConfig = require('./../config/cloudinary-audio');
const multer = require('multer');

const upload = multer();
const fs = require('fs'); //use the file system to save the files on the server
const User = require('../models/user');



/* GET home page. */

router.get('/add', function (req, res, next) {
    res.render('add');
});

router.post('/add', upload.single('songfile'), (req, res, next) => {
    const userId = req.session.currentUser._id
    const { description, title, artist, song } = req.body;

    if (description === '' || title === '' || artist === '') {
        res.render('auth/signup', { errorMessage: 'Provide valid inputs' });
        return;
    }

    /*****  FILE UPLOAD SEQUENCE *******/

    let uploadLocation = __dirname + '/uploads/' + req.file.originalname;

    // write the BLOB to the server as a file
    fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)));

    cloudinaryConfig.v2.uploader.upload(
        uploadLocation,
        { resource_type: "video", folder: `audio-files/`, overwrite: true },
        (error, result) => {
            if (error) res.status(500).send(error);
            else {
                // Delete the temporary file from the server
                fs.unlink(uploadLocation, (deleteErr) => {
                    if (deleteErr) res.status(500).send(deleteErr);
                    console.log('temp file was deleted');

                    const newSong = { description, title, artist, song: result.secure_url,userId };
                    Song.create(newSong)
                        .then((song) => {
                            console.log('Song added successfully');
                            User.findByIdAndUpdate(userId,{$push:{posts:song._id}})
                            .then((updatedUser)=>{
                            
                            res.render('index');
                                
                            })
                        })
                        .catch(err => {
                            res.render('add', { errorMessage: ' error while creating new song' });
                        });
                });

            }
        }
    );
router.post('add/delete/:id', (req, res, next) => {
    const userId = req.session.currentUser._id;
    Song.deleteOne({
            _id: userId
        })
        .then((user) => {
            console.log(user);

            res.redirect('/auth/signup');
        })
        .catch(err => console.log(err));
});

})// end of then

module.exports = router;
 