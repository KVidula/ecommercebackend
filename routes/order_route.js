const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const orderModel = mongoose.model('orderModel');

//create new order
router.post("/createorder", (req,res) => {
    const { products, shipping, paymethod, total, status ,user } = req.body;
    console.log(req.body);
     const postOrder = new orderModel({ products, shipping, paymethod, total, status, user });
    postOrder.save()
    .then((newOrder)=>{
       res.status(201).json({order: newOrder});
    })
    .catch((error)=>{
        console.log(error);
    })   
});

//get recent order
router.get("/getorder", (req,res) => {
    orderModel.findOne().sort({_id: -1})
    .then((orderinfo) => {
       res.status(200).json({order:orderinfo});
    })
    .catch((error) => {
        console.log(error);
    })
  });

//get order history for particular user
router.get("/getorderhistory/:id", (req,res) => {
    orderModel.find({user: req.params.id})
    .then((orderinfo) => {
       res.status(200).json({order:orderinfo});
    })
    .catch((error) => {
        console.log(error);
    })
  });


module.exports = router;
