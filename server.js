const express = require('express');
const Post = require('./Post');
const path = require('path');

const app = express();

app.use(express.json());

require('./db')

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, 'node-practice-frontend')));

app.get("/", (req,res) => {
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