const mongoose = require('mongoose');

const testimonalSchema = new mongoose.Schema({
   testimonalDescription:{
       type:String
   },
   testimonalImage:{
       type:String
   },
   date:{
       type:String
   },
   testimonalName:{
       type:String
   }
})

module.exports = mongoose.model('Testimonals',testimonalSchema);