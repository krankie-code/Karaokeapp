var express = require('express');
var router = express.Router();
const parser = require('../config/cloudinary');

const User = require('./../models/user');

// delete profile
router.post('/delete/:id', (req, res, next) => {
    const userId  = req.session.currentUser._id;
    User.deleteOne({_id:userId})
        .then( (user) => {
            console.log(user);
            
            res.redirect('/auth/signup');
        })
        .catch( err => console.log(err));
});

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

    const isLoggedIn = (req, res, next) => {
        if (req.session.currentUser) {
        next();
        }
        else {
            res.redirect("/auth/login");
        }  
    }
  
router.get('/edit-profile',isLoggedIn,( req,res,next) => {
    const userId = req.session.currentUser._id;
    User.findById({_id: userId})
        .then((user) => {
            res.render('profiles/edit-profile', { newUser :user});
        })
         .catch((error)=>res.render('profiles/edit-profile',{error : `RIP`}) )
        


});

module.exports=router;