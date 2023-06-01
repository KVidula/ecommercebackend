const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const productModel = mongoose.model('productModel');

//create new products
router.post("/createproduct", (req,res) => {
    const { productNm,category,description,price,productImg,stock,featured,ratings } = req.body;
    console.log(req.body);
    // if(!productNm || !category || !description || !price || !productImg || !stock || !featured || !ratings){
    //     return res.status(400).json({error: "One or more mandatory fields are empty"});
    // }
    const postProduct = new productModel({productNm,category,description,price,productImg,stock,featured,ratings});
    postProduct.save()
    .then((newProduct)=>{
       res.status(201).json({product: newProduct});
    })
    .catch((error)=>{
        console.log(error);
    })   
});

router.get("/getproducts", (req,res) => {
    productModel.find()
    .then((allproducts) => {
       res.status(200).json({products:allproducts});
    })
    .catch((error) => {
        console.log(error);
    })
});

//get featuredproducts
router.get("/getfeaturedproducts", (req,res) => {
    productModel.find({featured:true})
    .then((allproducts) => {
       res.status(200).json({featuredproducts:allproducts});
    })
    .catch((error) => {
        console.log(error);
    })
});

//get menproducts
router.get("/getmenproducts", (req,res) => {
    productModel.find({category:"men"})
    .then((allproducts) => {
       res.status(200).json({menproducts:allproducts});
    })
    .catch((error) => {
        console.log(error);
    })
});

//get womenproducts
router.get("/getwomenproducts", (req,res) => {
    productModel.find({category:"women"})
    .then((allproducts) => {
       res.status(200).json({womenproducts:allproducts});
    })
    .catch((error) => {
        console.log(error);
    })
});

//get kidsproducts
router.get("/getkidsproducts", (req,res) => {
    productModel.find({category:"kids"})
    .then((allproducts) => {
       res.status(200).json({kidsproducts:allproducts});
    })
    .catch((error) => {
        console.log(error);
    })
});

//get single product
router.get("/getsingleproduct/:id", (req,res) => {
    productModel.findOne({_id: req.params.id})
    .then((singleproduct) => {
       res.status(200).json({product:singleproduct});
    })
    .catch((error) => {
        console.log(error);
    })
});

//delete product
router.delete("/deleteproduct/:productId", (req,res) => {
    productModel.findOne({_id: req.params.productId})
    .exec((error,productFound)=>{
      if(error || !productFound){
         return res.status(400).json({error : "Product does not exist"});
      }else{
        productFound.remove()
         .then((data)=>{
             res.status(200).json({result : data});
         }) 
         .catch((error)=>{
             console.log(error);
         })
        }
    }) 
 });   

 

module.exports = router;