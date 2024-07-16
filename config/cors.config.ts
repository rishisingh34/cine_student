import cors from "cors";

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://cineportal2024.netlify.app/"
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

const handleCors = cors(corsOptions);

export default handleCors;
