require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userModel = mongoose.model("userModel");
const nodemailer = require("nodemailer");

//for signup page
router.post("/signup", (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "one or more mandatory fields are empty" });
  }
  userModel.findOne({ email: email }).then((userInDB) => {
    if (userInDB) {
      return res.status(500).json({ error: "User with this email already registered!" });
    }

    //encryption for password
      bcryptjs.hash(password, 16).then((hashedPassword) => {
      const user = new userModel({fullName, email, password: hashedPassword, isadmin: "No"});
      user.save()
        .then((newUser) => {
          res.status(201).json({ result: "User Signed up Successfully!" });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});

//for signin page
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "one or more mandatory fields are empty" });
  }
  userModel.findOne({ email: email })
    .then((userInDB) => {
      if (!userInDB) {
        return res.status(401).json({ error: "Invalid Credentials" });
      }
      bcryptjs.compare(password, userInDB.password)
        .then((didMatch) => {
          if (didMatch) {
            const jwtToken = jwt.sign({_id: userInDB._id},process.env.JWT_SECRET);
            const userInfo = {"id": userInDB._id , "email": userInDB.email , "fullName": userInDB.fullName, "isadmin": userInDB.isadmin };
            res.status(200).json({ result: {token: jwtToken , user: userInfo} });
          } else {
            return res.status(401).json({ error: "Invalid Credentials" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//get single user
router.get("/getuserinfo/:id", (req,res) => {
  userModel.findOne({_id: req.params.id})
  .then((userinfo) => {
     res.status(200).json({user:userinfo});
  })
  .catch((error) => {
      console.log(error);
  })
});

 

//sending mail to user using nodemailer after order confirmed
router.post("/sendMail", (req,res) => {
  const { userEmail } = req.body;
  console.log(req.body);
  let testAccount = nodemailer.createTestAccount();
  const mailInfo = {
   from: process.env.EMAIL_ID, // sender address
   to: `${userEmail}`, // list of receivers
   subject: "Order Confirm", // Subject line
   text: "Your order placed successfully.Delivery expected in 3 to 4 days.", // plain text body
  }
  console.log(mailInfo);

  let transporter = nodemailer.createTransport({
   host: "smtp.ethereal.email",
   port: 587,
   secure: false, // true for 465, false for other ports
   auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS
   },
 });

   transporter.sendMail(mailInfo, (error,info)=>{
     if(error){
       console.log(error);
       res.send(error);
     }else{
       console.log('email sent');
       res.send('success');
     }
   });

});



module.exports = router;