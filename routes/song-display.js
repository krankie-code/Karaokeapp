const express = require('express');
const router = express.Router();

const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
      next();
    }
    else {
        res.redirect("/auth/login");
    }  
  }

router.get('/video',isLoggedIn,(req,res,next)=>{
    res.render('song-display')
})

module.exports = router;