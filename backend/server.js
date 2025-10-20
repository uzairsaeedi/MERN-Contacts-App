const express = require("express");
const errorHandler = require("./controllers/middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require ("cors");

connectDB();
const app = express();

const port = process.env.PORT || 8000;
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use(errorHandler);

app.listen(port, () =>{
    console.log(`Server running on port: ${port}`);
});