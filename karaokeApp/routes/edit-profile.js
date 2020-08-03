var express = require('express');
var router = express.Router();
const parser = require('../config/cloudinary');

const User = require('./../models/user');

// delete profile
router.post('/delete/:id', (req, res, next) => {
    const { userId } = req.params;
    User.deleteOne({_id:userId})
        .then( (user) => {
            console.log(user);
            
            res.redirect('/auth/signin');
        })
        .catch( err => console.log(err));
});

/* router.post('/', parser.single('profilepic'), (req,res,next) => {
    const userId = req.session.currentUser._id;
    const { name,password,email,profilepic,bio} = req.body;
    
    if (typeof req.file != 'undefined') {
        image_url= req.file.secure_url;
    } else {
        image_url= '/images/avatar.png';
    } */
    router.post('/edit-profile', parser.single('profilepic'),( req,res,next) => {
        const userId = req.session.currentUser._id;
        // 1 destrcture username and password    
     const { name,email,password,profilepic,bio} = req.body;
            /* console.dir(req.file)
            console.log(req.file.secure_url) */
        let image_url;
     
        if (typeof req.file != 'undefined') {
            image_url= req.file.path;
        } else {
            image_url= '../images/avatar.png';
        } 

    User.updateOne({_id:userId},{ name,password,email,profilepic: image_url,bio}, {new:true})
        .then(()=> {
            //console.log({ user,password,email,picture,bio});
            console.log(" inside update");
            res.redirect('/profile/userprofile');
        
        })
        .catch((error) => console.log(err))

});

router.get('/edit-profile',( req,res,next) => {
    const userId = req.session.currentUser._id;
    User.findById({_id: userId})
        .then((user) => {
            res.render('profiles/edit-profile', { newUser :user});
        })
         .catch((error)=>res.render('profiles/edit-profile',{error : `RIP`}) )
        


});

module.exports=router;