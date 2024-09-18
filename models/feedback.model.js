const mongoose = require("mongoose");
const FeedbackSchema  = new mongoose.Schema({
    question : { type : String , required : true }, 
}, { versionKey : false });

const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback;