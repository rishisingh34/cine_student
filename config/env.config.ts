import dotenv from 'dotenv';
dotenv.config();

const PORT:string= process.env.PORT || '3000';
const DBURI:string= process.env.DBURI || 'mongodb://localhost:27017/studentdb';
const RECAPTCHA_SECRET_KEY:string|undefined= process.env.RECAPTCHA_SECRET_KEY ;
const ACCESS_TOKEN_SECRET:string|undefined= process.env.ACCESS_TOKEN_SECRET ;

export {PORT,DBURI,RECAPTCHA_SECRET_KEY,ACCESS_TOKEN_SECRET};