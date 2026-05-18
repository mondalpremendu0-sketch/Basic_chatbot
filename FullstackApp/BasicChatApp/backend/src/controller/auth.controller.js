const express = require("express");
const authModel = require("../model/auth.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function greetingController(req, res) {
    res.send("hello fronm server..");
}

async function registerController(req, res) {
    const { username, password } = req.body;

    const isUserExsists = await authModel.findOne({ username: username });
    if (isUserExsists) {
        return res.status(400).json({ message: "Username already in use.." });
    }

    const hasedPassword = await bcrypt.hash(password, 10);
    const user = await authModel.create({
        username: username,
        password: hasedPassword
    });

    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SERECT);

    res.status(201).json({ message: "Registered Successfully.", token });
}

async function loginController(req, res) {
    const { username, password } = req.body;
    try {
        const user = await authModel.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "Invalid Username " });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
            return res.status(404).json({ message: "Invalid Password " });
        }

        const token = jwt.sign(
            { id: user._id, username },
            process.env.JWT_SERECT
        );

        const decode = jwt.verify(token, process.env.JWT_SERECT);
        res.status(200).json({ message: "Loggedin Successfully", decode });
        console.log(decode);
    } catch (err) {
        res.status(400).json({ message: "Invalid token.." });
    }
}



module.exports = {
    greetingController,
    loginController,
    registerController
    
};
