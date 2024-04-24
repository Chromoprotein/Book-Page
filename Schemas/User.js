const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type:String,
        unique:true,
        required:true
    },
    password: {
        type:String,
        minlength:6,
        required:true
    },
    role: {
        type:String,
        default:"Basic",
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('User', userSchema)