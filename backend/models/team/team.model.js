const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    memberName:{
        type:String,
    },
    memberRole:{
        type:String,
    },
    memberImage:{
        type:String,
    },
    description:{
        type:String,
    }
})

module.exports = mongoose.model('Ourteam',teamSchema);