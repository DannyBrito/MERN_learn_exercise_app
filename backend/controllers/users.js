const User = require('../models/user.model');

exports.users_index = (req, res) =>{
    User.find()
    .select('_id username') //select desire attributes for class
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.user_create = (req,res) =>{
    const username = req.body.username;

    const newUser =  new User({username});

    const errorHandler = require('../helpers/errorHandler')
    newUser.save()
        .then(()=>res.status(200).json({message:'User added!',user:newUser}))
        .catch(err => { 
            res.status(400).json(errorHandler(err.errors))
        })
}