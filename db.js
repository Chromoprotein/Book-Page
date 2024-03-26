const mongoose = require('mongoose')

const dbURI = "mongodb+srv://bridgesofsighs:UXOhl67BAOGW1KiC@cluster0.qaklsip.mongodb.net/my-database?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(dbURI)
.then(res =>{
    console.log("DB connected");
})
.catch(err =>{
    console.error("DB not connected", err);
})