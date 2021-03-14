const mongoose = require('mongoose');
const menuItemSchema = require('./menuItem.model')
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    username: {
        type: String,
        required: true, 
        trim:true
    },
    itemsOrdered: {
        type: [menuItemSchema.Schema],
        required: true,
    },
    orderPurchased: {
        type: Boolean,
        required: true,
        default: false
    },
    pickUpTime: {
        type:String
    }
 

});

const orderModule = mongoose.model('order', orderSchema);
module.exports = orderModule;