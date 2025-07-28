const mongoose = require("mongoose")
const generateRandomString = require('../helpers/generate');


const accountSchema = new mongoose.Schema({
    fullName: String,
    email:String,
    phone: String,
    password: String,
    token: {
        type: String,
        default: () => generateRandomString.generateRandomString(32)
    },
    avatar: String,
    role_id: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt: Date,
},
{ timestamps: true }
)
const Accont = mongoose.model("Account", accountSchema, "accounts");

module.exports = Accont