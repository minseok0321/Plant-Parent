const router = require('express').Router();
let order = require('../models/order.model');


router.route('/addItem').post((req, res) => {
    const username = req.body.username;
    const orderItem = req.body.order;
    console.log("Here1");
    order.findOne({username:username}).then(orderReceived=> {
        if (!orderReceived) {
            //new order
            const orderArray = [orderItem];
 //           itemsOrdered.push(orderItem)
           // console.log(orderArray)
            const orderPurchased = false;
            const newOrder = new order({username, orderArray, orderPurchased});
            newOrder.save().then(()=>order.findOne({username:username}).then(order=>{
                order.itemsOrdered.push(orderItem);
            order.save().then(()=>res.json("Added item to order")).catch(err=>res.status(400).json("Error"+err));
            })).catch(err=>res.status(400).json("Error" + err));
            
        }
        else {
            //user already has an order, and I need to add to it
            console.log(orderItem)
            orderReceived.itemsOrdered.push(orderItem);
            orderReceived.save().then(()=>res.json("Added item to order")).catch(err=>res.status(400).json("Error"+err));
        }
    }).catch(err=>res.status(400).json("Error: " + err));

        
});

router.route('/deleteItem').delete((req, res) => {
    const username = req.body.username;
    const orderItem = req.body.order;

    //if i can't find that order, then throw an error. if i can find it, I need to splice the array and save it 
    order.findOne({username:username}).then(orderReceived => {
        if (!orderReceived) {
            res.status(400).json("Could not find order under that username");
        }
        else {
            orderReceived.itemsOrdered.pull(orderItem);
            orderReceived.save().then(()=>res.json("Deleted item from order")).catch(err=>res.status(400).json("Error"+err));
        }
    }).catch(err=>res.status(400).json("Error: " + err))
    
})

router.route('/viewOrder/:username').get((req, res)=> {
    const username = req.params.username;
    order.findOne({username:username}).then(orderReceived => {
            if(orderReceived)
            res.status(200).json({itemsOrdered:orderReceived.itemsOrdered, orderPurchased:orderReceived.orderPurchased, pickUpTime:orderReceived.pickUpTime})
            else
            res.status(200).json({itemsOrdered:[], orderPurchased:true})
        
    }).catch(err=>res.status(400).json("Error: " + err));
})

router.route('/deleteOrder').delete((req, res) => {
    const username = req.body.username;
    order.findOneAndRemove({username:username}).then(()=> {
        res.status(200).json("Deleted")
    }).catch(err=>res.status(400).json("Error: " + err))
})

router.route('/purchaseOrder').put((req, res) => {
    const username = req.body.username;
    order.findOne({username:username}).then(orderReceived => {
        if(orderReceived) {
            orderReceived.orderPurchased=true;
            orderReceived.save().then(()=>{res.status(200).json("Purchased order")}).catch(err=>res.status(400).json("Error:" + err))
        }
    }).catch(err=>res.status(400).json("Error: "+err))
})

router.route('/addPickUpTime').put((req, res)=> {
    const username = req.body.username;
    const pickUpTime = req.body.pickUpTime;
    order.findOne({username:username}).then(orderReceived => {
        if (orderReceived) {
            orderReceived.pickUpTime = pickUpTime;
            orderReceived.save().then(()=> {
                res.status(200).json("Added pick up time")}).catch(err=>res.status(400).json("error: " + err))
            }
        }).catch(err=>res.status(400).json("Error: "+err))
    })



module.exports = router; //do this for all routers