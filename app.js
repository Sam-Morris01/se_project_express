const express = require("express");
const mongoose = require("mongoose");
const userRouter = require('./routes/users');
const clothingItemsRouter = require('./routes/clothingItems');


const app = express();
const { PORT = 3001 } = process.env;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "67b83ca1f2a33caf3ff05186",
  };
  next();
});


// mongoose
mongoose.connect('mongodb://127.0.0.1:27017/wtwr_project_db');
mongoose.connection.on("connected", () => {
  console.log("MongoDB connection established successfully.");
})

// Routes
app.use('/' , userRouter);
app.use('/', clothingItemsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

