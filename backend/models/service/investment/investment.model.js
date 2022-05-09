const mongoose = require('mongoose');

const investmentchema = new mongoose.Schema({
  aboutinvestmentConsultency:{
      type:String
  },
  investmentTitle:{
      type:String
  },
  investmentImage:{
      type:[String]
  },
  description:{
      type:String
  }
})

module.exports = mongoose.model('Investment',investmentchema);