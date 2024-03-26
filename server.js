const express = require('express');
const Post = require('./Post')
const cors = require('cors');

const app = express();

// Use CORS middleware to allow cross-origin requests
app.options('*', cors());

app.use(express.json());

require('./db')

app.get("/post", (req,res) => {
    Post
        .find()
        .then((data) => {
            return res.status(200).json({
                data
            })
        })
        .catch((err) => {
            return res.status(400).json({
                err
            })
        })

})

app.get("/data", (req,res) => {
    return res.status(200).json({
        message:"success"
    })
})

app.listen(process.env.PORT || 8000, () => {
    console.log("server started on port 8000");
});