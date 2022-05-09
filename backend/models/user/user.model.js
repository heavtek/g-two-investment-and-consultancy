const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String
    },
    userPassword:{
        type:String
    },
    userEmail:{
        type:String
    },
    userRole:{
        type:String
    },
    userDescription:{
        type:String
    }
})


module.exports = mongoose.model('Users',userSchema);