const router = require('express').Router();
let user = require('../models/user.model');


//handles incoming get requests to localhost/menuItems/
router.route('/createAccount').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const type = req.body.type.toLowerCase();
    const newUser = new user({username, password, type});

    newUser.save().then(()=>{res.json("New user created!")}).catch(err=>{
        if(err.name == 'MongoError')
            res.status(400).json('Duplicate')
        else if (err.name == 'ValidationError')
            res.status(400).json('Too short')
        
        else
            res.status(400).json('Error'+err)
    }
        )

        
});

router.route('/login').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const type = req.body.type;

    user.findOne({username:username, password:password}).then(user => {
        if(user){
            res.status(200).json('Logged in!')
        }
        else {
            res.status(400).json('Not Found')
        }
    }).catch(err=>res.status(400).json('Error' + err));
    })

router.route('/type/:username').get((req, res)=> {
    const username = req.params.username;
    user.findOne({username:username}).then(user=> {
        if(user)
        res.json({type:user.type})
        else 
        res.status(400).json('User not found')
    }
        ).catch(err=>res.status(400).json('Error' + err))
})

router.route('/payment/:username').get((req, res) => {
    const username = req.params.username;
    user.findOne({username:username}).then(user=> {
        if (user) 
        res.json({paymentMethods:user.paymentMethods})
        else
        res.status(400).json('User not found')
    }).catch(err=>res.status(400).json('Error: ' + err))
})

router.route('/payment/save').post((req, res) => {
    const username = req.body.username;
    const paymentMethod = req.body.paymentMethod;
    user.findOne({username:username}).then(user => {
            user.paymentMethods.push(paymentMethod);
            user.save().then(()=>res.status(200).json("Added payment")).catch(err=>res.status(400).json("Error: " + err));
    }).catch(err=>res.status(400).json("Error: "+ err));
});


module.exports = router; //do this for all routers