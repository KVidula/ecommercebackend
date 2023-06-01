const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const orderModel = mongoose.model("orderModel");

//get all orders
router.get("/getallorders", (req,res) => {
    orderModel.find()
    .then((orderinfo) => {
       res.status(200).json({allorders:orderinfo});
    })
    .catch((error) => {
        console.log(error);
    })
  });

//delete order
router.delete("/deleteorder/:orderId", (req,res) => {
    orderModel.findOne({_id: req.params.orderId})
    .exec((error,orderFound)=>{
      if(error || !orderFound){
         return res.status(400).json({error : "order does not exist"});
      }else{
        orderFound.remove()
         .then((data)=>{
             res.status(200).json({result : data});
         }) 
         .catch((error)=>{
             console.log(error);
         })
        }
    }) 
 });   


 //update user
router.put("/updateorder/:orderId", (req,res) => {
    const { status } = req.body;
    orderModel.findOne({_id: req.params.orderId})
  .exec((error,orderFound)=>{
    if(error || !orderFound){
       return res.status(400).json({error : "order does not exist"});
    }else{
        orderModel.updateOne({_id: req.params.orderId},{$set:{status: status}})
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