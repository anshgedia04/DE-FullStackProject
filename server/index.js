const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
require("dotenv").config();

const cors = require("cors");
app.use(cors());

const Db_Connect = require("./config/database");
Db_Connect();

const port = process.env.PORT || 4000; // Fixed typo: `port` -> `PORT`

// Import routes
const blueDiamonds = require("./routes/blueDiamond");
const order_router = require("./routes/orderRoute");
const chatRoutes = require("./routes/chatRoutes"); // Add chat routes

// Use routes
app.use("/api/v1", blueDiamonds);
app.use("/api/v1", order_router);
app.use("/api/v1", chatRoutes); // Add chat routes

app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

app.listen(port, () => {
  console.log("Server is running on:", port);
});