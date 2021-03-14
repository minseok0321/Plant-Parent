const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    name: {
        type: String,
        required: true, 
        trim:true
    },
    number: {
        type: Number,
        required: true,
        unique:false,
        trim:true
    },
    method: {
        type: String,
        enum: ["apple", "paypal", "card"],
        required: true,
    },
});

const paymentModule = mongoose.model('payment', paymentSchema);
module.exports = paymentModule;