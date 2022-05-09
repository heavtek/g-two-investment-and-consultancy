const mongoose = require('mongoose');

const trainingListSchema = new mongoose.Schema({
   trainingId:{
       type:String,
       required:true
   },
   trainingListName:{
       type:String,
       required:true
   },
   listDescription:{
    type:String
}
})

module.exports = mongoose.model('Training-List',trainingListSchema)