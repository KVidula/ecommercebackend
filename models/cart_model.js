const mongoose = require('mongoose');
//const {ObjectId} = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true
    },
    productId : {
        type: String,
        required: true
    },
    userName : {
        type: String,
        required: true
    }

} , { timestamps:true }
);

mongoose.model("cartModel",cartSchema);