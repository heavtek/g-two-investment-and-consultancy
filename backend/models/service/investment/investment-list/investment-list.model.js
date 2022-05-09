const mongoose = require('mongoose');

const investmentListSchema = new mongoose.Schema({
   investmentId:{
       type:String,
       required:true
   },
   investmentListName:{
       type:String,
       required:true
   },
   listDescription:{
       type:String
   }
})

module.exports = mongoose.model('Investment-List',investmentListSchema)