const mongoose = require('mongoose')

module.exports ={    
    mongoose,
    connect:()=>{
        require('../connetion')
    },
    disconnect: done =>{
        mongoose.disconnect(done)
    }
}