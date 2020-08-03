const express = require('express');
const router = express.Router();

const User = require('../models/user');
const parser = require('./../config/cloudinary');
const bcrypt = require('bcryptjs');
const saltRounds = 10;


// GET '/signup'
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', parser.single('profilepic'),( req,res,next) => {
    
    // 1 destrcture username and password    
 const { name,email,password} = req.body;
        /* console.dir(req.file)
        console.log(req.file.secure_url) */
    let image_url;
 
    if (typeof req.file != 'undefined') {
        image_url= req.file.path;
    } else {
        image_url= '../images/avatar.png';
    } 


    if ( name ==='' || password === '' || email ==='' ){
        res.render('auth/signup', {errorMessage:'Provide valid inputs'});
        return;
    } 

    User.findOne({name})
        .then( (user) =>{
            if(user) {
                res.render('auth/signup', {errorMessage: 'User already created'});
                return;
            }
        // id doesn't exists generate salts ans hash
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password,salt);

        // once user is encrypted we add to db
        const newUser = {name,email, password: hashedPassword, profilepic: image_url}
        User.create(newUser)
            .then((data)=>{
                console.log('User added successfully');
                res.render('auth/login');
            } )
            .catch(err  => {
                res.render('auth/signup', { errorMessage:' error while creating new user'});
            });

    })// end of then
    .catch( (err) => console.log(err));
})// end of post

router.get('/login',(req,res,next)=>{
    res.render('auth/login');
})


// POST /auth/login
router.post('/login', (req, res, next) => {
    // Deconstruct the username and the password
    const {email, password: enteredPasword} = req.body;
    console.log(req.body);
    

    // check if username and password are empty strings
    if ( email ==='' || enteredPasword === ''){
        res.render('auth/login', {errorMessage:'Provide email and password'});
        console.log('Provide email and password');
        return;
    }

    // Find the user by username
    User.findOne( {email} )
        .then( (user) => {
            // If doesn't exist - return error
            
            if(!user) {
                res.render('auth/login', {errorMessage:"Username doesn't exist"});
                return;
            }

            // If username exists - check if the pswd is correct
            const hashedPasswordFromDb = user.password;
            const passwordCorrect = bcrypt.compareSync(enteredPasword, hashedPasswordFromDb);

            // If password is correct - create session and cookie and redirect
            console.log('passwordCorrect -->', passwordCorrect);
            
            if (passwordCorrect) {
                console.log('correct pswd');
                
                // Save the login in the session (and create cookie)
                // And redirect the user
                req.session.currentUser = user;
                res.redirect('/index');
                console.log('logged in');
            } else {
                res.render('auth/login', {errorMessage:"Incorrect password !"});
                return;
            }
        })
        .catch( (err) => next(err));
});
//logout 
router.get('/logout', (req, res, next) => {
    if (!req.session.currentUser) {
    res.redirect('/auth/login');
    return;
    }

    req.session.destroy((err) => {
    if (err) {
        next(err);
        return;
    }

    res.redirect('/auth/login');
    });
});



module.exports = router;