const mongoose = require('mongoose');

const valuesListSchema = new mongoose.Schema({
    valueId:{
        type:String
    },
    valueList:{
        type:String
    }
})

module.exports = mongoose.model('Makeus-different-List',valuesListSchema);