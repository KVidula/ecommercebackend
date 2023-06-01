const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cartModel = mongoose.model("userModel");

router.post("/cart", (req,res) => {
    const { userId,productId,userName } = req.body;
    console.log(req.body);
    const addtocart = new cartModel({ userId: userId, productId: productId, userName: userName });
    addtocart.save()
    .then((newCart)=>{
       res.status(201).json({cart: newCart});
    }) 
    .catch((error)=>{
        console.log(error);
    })   
});

module.exports = router;