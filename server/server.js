const newsletterRoutes = require("./routes/newsletterRoutes");
const express = require("express");
const adminRoutes = require("./routes/adminRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();



const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const contactRoutes = require("./routes/contactRoutes");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Backend Running");
});

// Existing Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));
app.use("/api/donors", require("./routes/donorRoutes"));
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});