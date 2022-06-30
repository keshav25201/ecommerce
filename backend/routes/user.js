const User = require('../models/User');
const {verifyToken} = require('verifyToken');
const {Router} = require('express');
const router = Router();

router.get('/:id',verifyToken,(req,res,next) => {
    if(req.params.id === req.user._id){
        User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
    }else{
        res.json("user not authorized");
    }
})