const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));



const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.send("Backend Running");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));
app.use("/api/donors", require("./routes/donorRoutes"));

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});