const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// phone: {
// type: String,
// validate: {
//   validator: function(v) {
//     return /\d{3}-\d{3}-\d{4}/.test(v);
//   },
//   message: props => `${props.value} is not a valid phone number!`
// },
// required:[true,"Phone Number required"]
const exerciseSchema = new Schema({
    username:{type: String,required:true},
    description:{type: String,required:true},
    duration:{type: Number, required:true},
    date:{type:Date,required:true}
},{
    timestamps: true,
});

// Doesn't affect
// exerciseSchema.path('date').validate(async(date)=>{
//     return date instanceof Date
// },'Error Try again');

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;