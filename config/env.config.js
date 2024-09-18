const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;
const DBURI =  process.env.DBURI ;
const RECAPTCHA_SECRET_KEY =  process.env.RECAPTCHA_SECRET_KEY ;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ;

module.exports =  {PORT,DBURI,RECAPTCHA_SECRET_KEY,ACCESS_TOKEN_SECRET};