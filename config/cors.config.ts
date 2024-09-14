import cors from "cors";

const corsOptions = {
  origin: [
    "https://cineportal2024.netlify.app",
    "https://cine2024.netlify.app",
    "http://localhost:3000",  
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

const handleCors = cors(corsOptions);

export default handleCors;
