const Order = require('../models/Order');
const {verifyToken} = require('./verifyToken');
const {Router} = require('express');
const router = Router();
//GET ALL ORDERS BY FILTER
router.get('/',verifyToken,(req,res) => {
    Order.find().then(orders => {
        res.send(orders);
    })
    .catch(err => res.json(err))
})

//GET AN ORDER BY user ID
router.get('/find',verifyToken,(req,res) => {
    Order.find({userId : req.user._id})
    .then(Orders => res.json(Orders))
    .catch(err => res.json(err))
})
//ADD NEW ORDER
router.post('/',verifyToken,(req,res) => {
    const newOrder = new Order(req.body);
    newOrder.save()
    .then(savedOrder => res.send(savedOrder))
    .catch(err => res.json(err));
})
//UPDATE A ORDER CAN ONLY BE DONE BY ADMIN
router.put('/:id',verifyToken,(req,res)=>{
    Order.findByIdAndUpdate(req.params.id,{$set : req.body})
    .then(updatedORDER => res.json(updatedOrder))
    .catch(err => res.json(err));
})
//DELETE A ORDER CAN ONLY BE DONE BY ADMIN
router.delete('/:id',verifyToken,(req,res) => {
    Order.findByIdAndDelete(req.params.id)
    .then(() => res.json("Order has been deleted"))
    .catch(err => res.json(err));
})
module.exports = router;