const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

// Middleware
app.use(cors());
app.use(express.json());


// mongoose
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_project_db");
mongoose.connection.on("connected", () => {
  console.log("MongoDB connection established successfully.");
});

// Routes
app.use("/", routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
