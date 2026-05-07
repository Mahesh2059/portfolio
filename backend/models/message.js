const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({

    name: String,

    email: String,

    message: String

});

module.exports = mongoose.model("Message", MessageSchema);