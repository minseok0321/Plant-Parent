const mongoose = require('mongoose');
const paymentSchema = require('./payment.model')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true, 
        unique:true, 
        trim:true,
        minLength: 8
    },
    password: {
        type: String,
        required: true,
        unique:false,
        trim:true
    },
    type: {
        type: String,
        required: true,
        enum: ["customer", "admin", "staff"]
    },
    paymentMethods: {
        type:[paymentSchema.Schema]
    }
    
});

const userModule = mongoose.model('user', userSchema);
module.exports = userModule;