const mongoose = require('mongoose'); 
const { DBURI } = require('./env.config'); 

const connectDb=async()=>{
    try{
        await mongoose.connect(DBURI);
        console.log("db connected.");
    }
    catch(err){
        console.log({error:err});
    }
}
module.exports = connectDb; 