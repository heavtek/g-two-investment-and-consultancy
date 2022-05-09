const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
   ratingNumber:{
       type:String
   },
   reviewNumber:{
       type:String
   }
})

module.exports = mongoose.model('Rating',ratingSchema);