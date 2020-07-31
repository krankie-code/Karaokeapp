const express = require('express')
const router = express.Router();

const User = require('./../models/user')

const bcrypt = require('bcryptjs');
const saltRounds = 10;


router.get('/signup', (req, res, next)=>{
    res.render('auth/signup',{
        errorMessage:''
    });
});

router.post('/signup', async (req,res,next)=>{
    const {name,email,password} = req.body;

    if(email === '' || password === ''){
        res.render('auth/signup', {errorMessage:`There's already an account with the email ${email}`});
        return;
    }
    try {
        const findUser = await User.findOne({email:email})

        if(findUser){
            res.render('auth/signup',{errorMessage: `There is already an account with this email :${email}`})
            return;
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt)

        await User.create({name , email, password : hash})
        res.redirect('/login');
    } catch (error) {
        res.render('auth/singup', {errorMessage : `Error while creating account. Please try again.`})
    }

})

    router.get('/login', (req,res,next)=>{
        res.render('auth/login',{
            errorMessage: ''
        });
    });

    router.post('/login', async (req,res,next)=>{
        const {email, password} = req.body;

        if(email === '' | password === ''){
            res.render('auth/login', {errorMessage :'Enter both email and password to log in'
        });
        return;
        }
        try {
        const foundUser = await User.findOne({email:email})
        console.log(foundUser);
            if(!foundUser){
                res.render('auth/login',{
                    errorMessage:`Invalid email ${email}`

                })
                return;
            }
            if(!bcrypt.compareSync(password, foundUser.password )){
                res.render('auth/login',{
                    errorMessage : `Invalid password`
                })
                return;
            }
            req.session.currentUser = foundUser;
             res.redirect('/');

        } catch (error) {
            res.render('auth/login', {errorMessage : `Error while creating account. Please try again.`})
        }
    })

    
    router.get('/logout', (req, res, next) => {
        if (!req.session.currentUser) {
        res.redirect('/');
        return;
        }
    
        req.session.destroy((err) => {
        if (err) {
            next(err);
            return;
        }
    
        res.redirect('/');
        });
    });
  
  
  module.exports = router;

module.exports = router;