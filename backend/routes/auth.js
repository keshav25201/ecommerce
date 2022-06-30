const {Router} = require('express');
const passport = require('passport');
const {verifyToken} = require('./verifyToken');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = Router();

router.post('/login',[passport.authenticate('local',{session:false})],async(req,res,next) => {
    if(req.isAuthenticated()){
        const payload = {
            name : req.user.name,
            _id : req.user._id
        }
        const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn : "1h"});
        return res.status(200).cookie('JWT',"Bearer " + token,{
            maxAge: 86_400_000,
            sameSite : 'lax'
        }).json({user : req.user.name});
    }else{
        res.status(401).json("error");
    }
})
router.post('/register',async(req,res,next) => {
    const newUser = new User({
        name: req.body.name,
        mobile : req.body.mobile,
        email : req.body.email,
        password : req.body.password
    })
    //validation error occurs on saving the object
    newUser.save().then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})
//verifyToken
router.get('/verifyToken',verifyToken,async(req,res) => {
    return res.status(200).json({user : req.user.name});
})

//logout
router.get('/logout',verifyToken,(req,res) => {
    res.clearCookie('JWT',{
        sameSite : 'lax',
        secure : true
    }).send();
})
module.exports = router