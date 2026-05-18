const mongoose = require("mongoose");

function connectDb() {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Connected to DB Sucessfully.");
        })
        .catch(error => {
            console.error("Error From Db:", error);
        });
}
module.exports = connectDb