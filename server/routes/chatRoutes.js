const express = require("express");
const { handleChat } = require("../controllers/chatController");
const { rateLimiter } = require("../utils/rateLimiter");


const router = express.Router();

router.post("/chat", rateLimiter, handleChat);

module.exports = router;