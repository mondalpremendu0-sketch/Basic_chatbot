const express = require("express");
const generateCaption = require("../service/ai.service.js");
const uploadFile = require("../service/Imgkit.service.js");
const { v4: uuidv4 } = require("uuid");
const postModel  = require("../model/post.model.js")





async function createPostController(req, res) {
    const imgfile = req.file;
    
    try {
      
        const base64ImageFile = Buffer.from(imgfile.buffer).toString("base64");

        const caption = await generateCaption(base64ImageFile);
        const imgString = await uploadFile(imgfile.buffer, `${uuidv4()}`);
        
       
       
        const post = await postModel.create({
          image:imgString,
          caption,
        })
        
        res.status(200).json({post});
        
    } catch (err) {
        console.error("Gemini Error:", err.message);

        return res.status(500).json({
            message: "AI quota exceeded. Try again later."
        });
    }
}

module.exports = createPostController;
