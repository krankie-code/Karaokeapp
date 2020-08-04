var express = require('express');
var router = express.Router();

var Song = require('../models/song')
const parser = require('./../config/cloudinary');


/* GET home page. */

router.get('/add', function(req, res, next) {
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

})// end of then



module.exports = router;
