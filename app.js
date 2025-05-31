const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/loggers");
const { SERVER_ERROR_STATUS_CODE } = require("./utils/errors");
const { errors } = require('celebrate');

const app = express();
const { PORT = 3001 } = process.env;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use(requestLogger);

// mongoose
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_project_db");
mongoose.connection.on("connected", () => {
  console.log("MongoDB connection established successfully.");
});

// Routes
app.use("/", routes);

// Error logging middleware
app.use(errorLogger);

// Celebrate error handler
app.use(errors());

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
