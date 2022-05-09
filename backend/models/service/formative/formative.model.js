const mongoose = require('mongoose');

const formativechema = new mongoose.Schema({
  aboutformativeConsultency:{
      type:String
  },
  formativeTitle:{
      type:String
  },
  formativeImage:{
      type:[String]
  },
  description:{
      type:String
  }
})

module.exports = mongoose.model('Formative',formativechema);