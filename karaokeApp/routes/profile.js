var express = require('express');

var router = express.Router();

const User = require('../models/user');
const Song = require('../models/song');


router.get('/userprofile', (req,res,next) =>{
    const {_id} = req.session.currentUser
    User.findOne({_id})
    .then((user)=>{
        res.render('profiles/userprofile', {newUser: user})

    })
    .catch((error)=>res.render('profiles/userprofile',{error : `RIP`}) )
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