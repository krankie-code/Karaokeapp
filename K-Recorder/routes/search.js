const express = require('express');
const router = express.Router();



router.get('/search',(req,res,next)=>{
    res.render('search')
})

module.exports = router;
