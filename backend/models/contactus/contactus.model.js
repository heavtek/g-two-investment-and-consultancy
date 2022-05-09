const mongoose = require('mongoose');

const contactusSchema = new mongoose.Schema({
    address:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    facebook:{
        type:String
    },
    telegram:{
        type:String
    },
     twitter:{
        type:String
    },
    linkedin:{
        type:String
    },
    description:{
        type:String
    }
})

module.exports = mongoose.model('ContactInfo',contactusSchema);