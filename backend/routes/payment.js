const router = require('express').Router();
const Order = require('../models/Order');
const  { verifyToken } =  require('./verifyToken');
const cors = require('cors');
const SECRET_TEST_KEY = 'sk_test_51L7XKnSJ6igNhOfNmOsSnc3TQXQCy4xjwd9uglSG9l5KFYsVFUBLcX5yMPCPWl75AuH3JxjiydXIF0vRX4I32AAj00NN3u8Iaq'
const stripe = require('stripe')(SECRET_TEST_KEY);
router.post('/',verifyToken,async(req,res) => {
    const orderData = {
        userId : req.user._id,
        amount : req.body.amount,
        address : req.body.address,
        products : req.body.items
    }
    const newOrder = new Order(orderData);
    newOrder.save()
    .then((order) => {
        // console.log(order);
        let {amount,id} = req.body;
        stripe.paymentIntents.create({
            amount : amount,
            currency : "usd",
            description : "BUY KARO.com",
            payment_method : id,
            confirm : true 
        })
        .then((payment) => {
            res.send("payment successful");
        })
    })
    .catch(err => {
        console.log(err);
        res.send("payment not successful");
    })
})

module.exports = router;