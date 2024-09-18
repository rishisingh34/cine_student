const cors = require("cors"); 

const corsOptions = {
  origin: [
    "https://cineportal2024.netlify.app",
    "https://cine2024.netlify.app",
    "http://localhost:3000",
    "https://cinetest24.netlify.app"  
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

const handleCors = cors(corsOptions);

module.exports = handleCors; 
