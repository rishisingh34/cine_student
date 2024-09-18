const mongoose = require('mongoose'); 

const FeedbackResponseSchema = new mongoose.Schema({
    student : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Student',
        required : true
    },
    response : [{
        question : {type : String, required : true},
        ans : {type : String, required : true}
    }]
}, { versionKey : false}); 

const FeedbackResponse = mongoose.model('FeedbackResponse', FeedbackResponseSchema);
module.exports = FeedbackResponse;