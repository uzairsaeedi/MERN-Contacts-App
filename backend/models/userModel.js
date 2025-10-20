const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the username."],
    },
    email: {
        type: String,
        required: [true, "Please add the user email address."],
        unique: [true, "Email Address already exists."],
    },
    password: {
        type: String,
        required: [true, "Please add the user password"],
    },
}, {
    timstamps: true,
});

module.exports = mongoose.model("User", userSchema);