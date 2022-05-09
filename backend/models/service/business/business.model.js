const mongoose = require('mongoose');

const businesSchema = new mongoose.Schema({
  aboutBusinessConsultency:{
      type:String
  },
  businessTitle:{
      type:String
  },
  businessImage:{
      type:[String]
  },
  description:{
      type:String
  }
})

module.exports = mongoose.model('Business',businesSchema);