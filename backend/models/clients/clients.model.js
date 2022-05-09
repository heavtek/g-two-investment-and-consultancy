const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    clientName:{
        type:String
    },
    clientLogo:{
        type:String
    }
})


module.exports = mongoose.model('Cliets',clientSchema);