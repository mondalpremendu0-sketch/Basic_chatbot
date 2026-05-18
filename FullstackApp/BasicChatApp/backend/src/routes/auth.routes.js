const express = require("express");
const {
    greetingController,
    loginController,
    registerController,
    
} = require("../controller/auth.controller.js");
const router = express.Router();

//POST api=> register
//POST api=> login
//POST api=> Upload posts
router.get("/", greetingController);

router.post("/register", registerController);

router.post("/login", loginController);


module.exports = router;
