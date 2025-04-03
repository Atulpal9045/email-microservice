require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const emailRoutes = require("./routes/emailRoutes");
const cors = require('cors')

// Ensure queue worker starts
require("./queue/emailQueue");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/emailServiceDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

app.use("/api/email", emailRoutes);

const PORT = process.env.PORT || 4000;
app.listen(4000, () => console.log(`Server running on port ${PORT}`));
