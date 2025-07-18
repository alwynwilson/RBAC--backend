require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const staffRoutes = require('./routes/staff');

connection();

const server = express();

server.use(cors({origin: "*"}));
server.use(express.json());

server.use('/api/auth', authRoutes);
server.use('/api/students', studentRoutes);
server.use('/api/staff', staffRoutes);


PORT = 3000 || process.env.PORT;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running in port:${PORT}`);
});
