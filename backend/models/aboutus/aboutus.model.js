const mongoose = require('mongoose');

const aboutusSchema = new mongoose.Schema({
    aboutusDescription:{
        type:String
    },
    ourMission:{
        type:String,
        required:true
    },
    ourVision:{
        type:String,
        required:true
    },
    ourValues:{
        type:String,
        required:true
    },
    businessApproach:{
        type:String,
        required:true
    },
    makeUsDifferent:{
        type:String,
        required:true
    },
    aboutusImage:{
        type:String
    }
})

module.exports = mongoose.model('Aboutus',aboutusSchema);