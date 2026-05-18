const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
});

const authModel = mongoose.model("auths",authSchema)


module.exports = authModel