const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/index");
const { SERVER_ERROR_STATUS_CODE } = require("./utils/errors");
const { errors } = require('celebrate');

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

// Celebrate error handler
app.use(errors());

// Error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || SERVER_ERROR_STATUS_CODE;
  const message = err.message || "An error has occurred on the server";
  res.status(statusCode).send({ message });
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
