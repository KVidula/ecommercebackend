const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userModel = mongoose.model("userModel");

//for getuserlist
router.get("/getuserlist", (req,res) => {
  userModel.find()
  .then((allusers) => {
     res.status(200).json({userlist:allusers});
  })
  .catch((error) => {
      console.log(error);
  })
});

//delete user
router.delete("/deleteuser/:userId", (req,res) => {
    userModel.findOne({_id: req.params.userId})
    .exec((error,userFound)=>{
      if(error || !userFound){
         return res.status(400).json({error : "User does not exist"});
      }else{
        userFound.remove()
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
router.put("/updateuser/:userId", (req,res) => {
  const { isAdmin } = req.body;
  userModel.findOne({_id: req.params.userId})
  .exec((error,userFound)=>{
    if(error || !userFound){
       return res.status(400).json({error : "User does not exist"});
    }else{
      userModel.updateOne({_id: req.params.userId},{$set:{isadmin: isAdmin}})
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