const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema({
    products: [{
            type: String ,
            required: true
        }],
    shipping : {
        type: String,
        required: true
    },
    paymethod : {
        type: String,
        required: true
    },
    total : {
        type: Number,
        required: true
    },
    status : {
        type: String,
        required: true
    },
    user : {
        type: String,
        required: true 
    } 
}, { timestamps:true }
);

mongoose.model("orderModel",orderSchema);