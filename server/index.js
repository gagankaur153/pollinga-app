const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authroute = require('./routes/authRoute')
const poolroute = require('./routes/poolRoute')
const adminroute = require('./routes/adminRoute')
const cors = require('cors')

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/poolingsystem")
.then(()=> console.log("DB connected"))
.catch(err => console.log(err));

app.use("/api/auth", authroute);
app.use("/api/polls", poolroute);
app.use("/api/admin", adminroute);

app.listen(5000, () => console.log("Server running"));