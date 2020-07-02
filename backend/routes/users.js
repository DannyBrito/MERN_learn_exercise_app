const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res)=>{
    User.find()
        .select('_id username') //select desire attributes for class
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req,res)=>{
    const username = req.body.username;

    const newUser =  new User({username});

    const errorHandler = require('../helpers/errorHandler')
    newUser.save()
        .then(()=>res.status(200).json('User added!'))
        .catch(err => { 
            res.status(401).json(errorHandler(err.errors))
        })
});

module.exports = router;