const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username : {
        type: "String",
        unique : true,
        required: true
    },
    password : {
        type : "String",
        required: true
    },
    userType : {
        type : "String",
        required: true
    }
})

module.exports = mongoose.model("users", UserSchema)