const express = require('express');
const router = express.Router();



router.get('/video',(req,res,next)=>{
    res.render('song-display')
})

module.exports = router;