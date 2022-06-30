const Product = require('../models/Product');
const {verifyToken} = require('./verifyToken');
const {Router} = require('express');
const { verify } = require('jsonwebtoken');
const router = Router();
//GET ALL PRODUCTS BY FILTER
router.get('/',async(req,res) => {
    const qTitle = req.query.title;
    const qCategory = req.query.category;
    if(qTitle){
        Product.find({
            title : {
                $regex : `.*${qTitle}.*`,
                $options : 'i'//case insensitive
            }
        })
        .then(products => {
            res.json(products)
        })
        .catch(err => res.json(err))
    }else if(qCategory){
        Product.find({
            categories : {
                $in : [qCategory]
            }
        })
        .then(products => {
            res.json(products);
        })
        .catch(err => res.json(err))
    }else{
        Product.find().then(products => {
            res.json(products);
        })
        .catch(err => res.json(err))
    } 
})

//GET SINGLE PRODUCT
router.get('/find/:id',async(req,res) => {
    Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.json(err))
})
//ADD NEW PRODUCT
router.post('/',verifyToken,async(req,res) => {
    const newProduct = new Product(req.body);
    newProduct.save()
    .then(savedProduct => res.send(savedProduct))
    .catch(err => res.json(err));
})
//UPDATE A PRODUCT
router.put('/:id',verifyToken,async(req,res)=>{
    Product.findByIdAndUpdate(req.params.id,{$set : req.body})
    .then(updatedProduct => res.json(updatedProduct))
    .catch(err => res.json(err));
})
//DELETE A PRODUCT
router.delete('/:id',verifyToken,async(req,res) => {
    Product.findByIdAndDelete(req.params.id)
    .then(() => res.json("product has been deleted"))
    .catch(err => res.json(err));
})
module.exports = router;