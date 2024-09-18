const express = require('express');
const { PORT } = require('./config/env.config'); 
const app = express();
const connectDb = require('./config/db.config'); 
const studentRoutes = require('./routes/student.routes');
const cookieParser = require('cookie-parser');
const handleCors = require('./config/cors.config');

app.use(express.json());
app.use(cookieParser());
app.use(handleCors);
connectDb();
app.use('/student', studentRoutes);
app.listen(PORT , ()=> {
  console.log(`Server is running on port ${PORT}`);
})