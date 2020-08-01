var express = require('express');

var router = express.Router();

const User = require('../models/user');
const Song = require('../models/song');
const { get } = require('mongoose');

router.get('/userprofile', (req,res,next) =>{
res.render('profiles/userprofile')
})
   /*  const userId = req.session.currentUser._id;
    let favToPrint = [];
    User.findById( {_id : userId})
    .populate('favouriteSongs')
    .then((user)=>{
        Promise.all(user.favouriteSongs.map(song =>{
            return Song.findById({ _id: song._id})
                .populate('userId')
                .then(data =>{
                    favToPrint.push({
                        userId:{
                            user: data.userId.name
                        }

                    })
                    return data;
                })    
        }))
        
    })
}) */

module.exports = router;