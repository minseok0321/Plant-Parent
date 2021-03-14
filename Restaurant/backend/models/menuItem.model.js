const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
    name: {
        type: String,
        required: true, 
        unique:true, 
        trim:true
    },
    description: {
        type: String,
        required: true,
        unique:false,
        trim:true
    },
    cost: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        required:true,
    }
});

const menuItemModule = mongoose.model('menuItem', menuItemSchema);
module.exports = menuItemModule;