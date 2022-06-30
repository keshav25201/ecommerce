const Cart = require('../models/Cart');
const {verifyToken} = require('./verifyToken');
const {Router} = require('express');
const router = Router();
//GET CART
router.get('/',verifyToken,(req,res) => {
    Cart.findOne({userId : req.user._id}).then(cart => {
        res.send(cart);
    })
})
//POST
router.post('/',(req,res) => {
    const newCart = new Cart(req.body);
    newCart.save()
    .then(savedCart => res.json(savedCart))
    .catch(err => res.json(err));
})
//UPDATE CART

router.put('/',verifyToken,(req,res) => {
    res.json({});
})

module.exports = router;