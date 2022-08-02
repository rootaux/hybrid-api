const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username : {
        type: "String",
        unique : true
    },
    password : {
        type : "String"
    },
    userType : {
        type : "String"
    }
})

module.exports = mongoose.model("users", UserSchema)