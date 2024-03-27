const mongoose = require('mongoose')
require('dotenv').config()

const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
.then(res =>{
    console.log("DB connected");
})
.catch(err =>{
    console.error("DB not connected", err);
})