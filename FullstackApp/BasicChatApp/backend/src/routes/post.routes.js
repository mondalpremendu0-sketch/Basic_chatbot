const express = require("express");
const authMiddleWare = require("../middleware/auth.middleware.js");
const createPostController = require("../controller/post.controller.js");
const multer = require("multer");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), createPostController);

module.exports = router;
