const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productNm : {
        type:String,
        required:true
    },
    category : {
        type:String,
        required:true
    },
    description : {
        type:String,
        required:true
    },
    price : {
        type:Number,
        required:true
    },
    productImg : {
        type:String,
        required:true
    },
    stock : {
        type:Number,
        required:true
    },
    featured : {
        type:Boolean,
        required:true
    },
    ratings : {
        type:Number,
        required:true
    }
});

mongoose.model("productModel",productSchema);