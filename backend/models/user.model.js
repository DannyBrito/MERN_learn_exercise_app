const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        // unique: true,
        trim: true,
        minlength:[4,'Username must be at least 4 characters'],
    },
},{
    timestamps: true,
});

userSchema.path('username').validate(async(username)=>{
    const usernameCount = await mongoose.models.User.countDocuments({username})
    return !usernameCount
},'Username already exists');

const User = mongoose.model('User',userSchema);

module.exports = User;