const mongoose = require('mongoose');

const businessListSchema = new mongoose.Schema({
   businessId:{
       type:String,
       required:true
   },
   businessListName:{
       type:String,
       required:true
   },
   listDescription:{
    type:String
}
})

module.exports = mongoose.model('Business-Approach-List',businessListSchema)