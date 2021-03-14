const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express(); //create express server
const port = process.env.PORT || 5000;

app.use(cors()); //cors middleware
app.use(express.json()); //allows us to parse json

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}); //connect to our mongo atlas cluster
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("Mongo DB connection established");
})

const menuItemsRouter = require('./routes/menuItems');
app.use('/menuItems', menuItemsRouter); //if someone goes to /menuItems, they will see everything in the menuItemsRouter 
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
const ordersRouter = require('./routes/orders');
app.use('/orders', ordersRouter);

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});