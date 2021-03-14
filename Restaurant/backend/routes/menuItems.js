const router = require('express').Router();
let menuItem = require('../models/menuItem.model');


//handles incoming get requests to localhost/menuItems/
router.route('/').get((req, res) => {
    menuItem.find().then(menuItems=> res.json(menuItems)).catch(err=>res.status(400).json('Error!' + err))
    //find is a mongoose method that gets all menu items in the mongodb
});

//handles incoming post requests to localhost/menuItems/add
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const cost = Number(req.body.cost);
    const available = Boolean(req.body.available);

    const newItem = new menuItem({name, description, cost, available});

    newItem.save().then(()=>res.json("New item added")).catch(err=>res.status(400).json('Error' + err))
});

router.route('/changeStock/:name').put((req, res) => {
    menuItem.findOne({name:req.params.name}).then(menuItem => {
        //console.log(menuItem)
        menuItem.available = req.body.available;
        console.log(req.body)
        menuItem.save().then(()=>res.json("Availability updated!")).catch(err=> res.status(400).json("Error:" + err));
    }).catch(err=>res.status(400).json("Error:" + err));
});

module.exports = router; //do this for all routers