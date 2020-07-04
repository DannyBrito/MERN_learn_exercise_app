const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// GET -> '/exercises'
router.route('/').get((req, res)=>{
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST -> '/exercises'
router.route('/').post((req,res)=>{

    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    
    const newExercise =  new Exercise({username,description,duration,date,});
    const errorHandler = require('../helpers/errorHandler')
    newExercise.save()
        .then(()=>res.json({message:'exercise added!', exercise: newExercise}))
        .catch(err => res.status(400).json(errorHandler(err.errors)))
});

// GET -> '/exercises/:id'
router.route('/:id').get((req,res)=>{
    Exercise.findById(req.params.id)
        .then(exercise=> res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err))
});

// DELETE -> '/exercises/:id'
router.route('/:id').delete((req,res)=>{
    Exercise.findByIdAndDelete(req.params.id,function(err,doc){
        if(err || !doc)res.status(400).json('Error: ' + err)
        else res.json('Exercise deleted')
    })
});

//PUT -> '/exercises/:id'
router.route('/:id').put((req,res)=>{
    Exercise.findByIdAndUpdate(req.params.id,{
        username: req.body.username,
        description: req.body.description,
        duration: Number(req.body.duration),
        date: Date.parse(req.body.date),
    })
    .then(()=>res.json("Exercise updated"))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;