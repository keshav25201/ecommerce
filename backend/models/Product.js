const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductSchema = new Schema({
    title : {type:String,required:true,unique:true},
    description: {type:String,required:true},
    categories : {type:Array}, 
    image: {type:String,required:true},
    size : {type:String,required:true},
    color : {type:String,required:true},
    price : {type:Number,required:true}
},{timestamps : true});

module.exports = mongoose.model("Product",ProductSchema);