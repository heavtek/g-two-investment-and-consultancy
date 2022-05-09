const mongoose = require('mongoose');

const formativeListSchema = new mongoose.Schema({
   formativeId:{
       type:String,
       required:true
   },
   formativeListName:{
       type:String,
       required:true
   },
   listDescription:{
    type:String
}
})

module.exports = mongoose.model('Formative-Research-List',formativeListSchema)