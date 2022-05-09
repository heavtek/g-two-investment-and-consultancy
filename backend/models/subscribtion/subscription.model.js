const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    email:{
        type:String
    }
})

module.exports = mongoose.model('Subscribers',subscriptionSchema);