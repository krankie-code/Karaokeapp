/* var express = require('express');
var router = express.Router();

var Song = require('../models/song')
const parser = require('./../config/cloudinary');
 */

/* GET home page. */

/* router.get('/add', function(req, res, next) {
  res.render('add');
});

router.post('/add',parser.single('songfile'),(req,res,next)=>{
    const {description, title, artist, song} = req.body

    if ( description ==='' || title === '' || artist ==='' ){
        res.render('auth/signup', {errorMessage:'Provide valid inputs'});
        return;
    } 
    const newSong = {description, title, artist, song}
    Song.create(newSong)
    .then((data)=>{
        console.log('Song added successfully');
        res.render('index');
    } )
    .catch(err  => {
        res.render('add', { errorMessage:' error while creating new song'});
    });

})



module.exports = router;
 */

var express = require('express');
var router = express.Router();

var Song = require('../models/song')
// const parser = require('./../config/cloudinary');

const cloudinaryConfig = require('./../config/cloudinary-audio');
const multer = require('multer');

const upload = multer();
const fs = require('fs'); //use the file system to save the files on the server



/* GET home page. */

router.get('/add', function (req, res, next) {
    res.render('add');
});

router.post('/add', upload.single('songfile'), (req, res, next) => {

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

                    const newSong = { description, title, artist, song: result.secure_url };
                    Song.create(newSong)
                        .then((song) => {
                            console.log('Song added successfully');
                            res.render('index');
                        })
                        .catch(err => {
                            res.render('add', { errorMessage: ' error while creating new song' });
                        });
                });

            }
        }
    );


})// end of then

module.exports = router;