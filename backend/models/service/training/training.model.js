const mongoose = require('mongoose');

const trainingchema = new mongoose.Schema({
  abouttrainingConsultency:{
      type:String
  },
  trainingTitle:{
      type:String
  },
  trainingImages:{
      type:[String]
  },
  description:{
      type:String
  }
})

module.exports = mongoose.model('Training',trainingchema);