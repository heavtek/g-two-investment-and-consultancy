const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title:{
        type:String
    },
    url:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String
    }
})

module.exports = mongoose.model('Notification',notificationSchema);