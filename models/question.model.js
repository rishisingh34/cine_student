const mongoose = require('mongoose');   

const questionSchema = new mongoose.Schema({
    subject : { type : String , required : true },
    question : { type : String , required : true },
    options : [{
        desc : { type : String , required : true },
        id : { type : Number  , required : true }
    }],
    answer : { type : Number  ,required : true }
}, { versionKey : false});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;