const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    preference : { type : Number } , 
    lastActivity : { type : Number }, 
    timeSpent : { type : Number}, 
    questions : { type : Object, default : {}},
    isSubmitted : { type : Boolean , default : false} 
}, { versionKey : false }); 

const Activity = mongoose.model('Activity', ActivitySchema);
module.exports = Activity;