require("dotenv").config();
const express = require('express');
const app = express();
// const PORT = 4000;
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const mongoose = require('mongoose');


global.__basedir = __dirname; //basedir is a global variable,it holds the path of this folder

mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.on('connected',()=>{
    console.log("DB Connected!");
})

mongoose.connection.on('error',(error)=>{
    console.log("Some error while connecting to DB!");
})

app.use(cors());
app.use(express.json());

 require('./models/user_model');
 require('./models/product_model');
 require('./models/cart_model');
 require('./models/order_model');

 app.use(require('./routes/user_route'));
 app.use(require('./routes/cart_route'));
 app.use(require('./routes/order_route'));

 app.use(require('./adminRoutes/product_route'));
 app.use(require('./adminRoutes/imgfile_route'));
 app.use(require('./adminRoutes/allusers_route'));
 app.use(require('./adminRoutes/manageorders_route'));
 
// app.get('/welcome',(req,res)=>{
//     res.status(200).json({'msg':'Hello World!'});
// });

app.listen(PORT,()=>{
    console.log('Server Started!');
});
