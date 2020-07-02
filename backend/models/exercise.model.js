const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    username:{type: String,required:true},
    description:{type: String,required:true},
    duration:{type: Number, required:true},
    date:{type:Date,required:true}
},{
    timestamps: true,
});

// using to somewhat serialize instance

exerciseSchema.methods.toJSON = function(){
    let obj =  this.toObject()
    let attrToRemove = ['createdAt','updatedAt','__v']
    attrToRemove.forEach(att => delete obj[att])
    return obj
}

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;