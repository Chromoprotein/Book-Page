const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const posts = [
    {id: 1, name: "react", description: "javascript library"},
    {id: 2, name: "node js", description: "javascrip runtime environment"}
]

app.get("/post", (req,res) => {
    return res.status(200).json({
        posts
    })
})

app.get("/data", (req,res) => {
    return res.status(200).json({
        message:"success"
    })
})

app.listen(process.env.PORT, () => {
    console.log("server started on port 8000");
});