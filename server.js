const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();

//Cors should prevent CORS errors. If they happen anyway, clearing the cache works
app.use(cors({ 
    origin: 'http://localhost:3000', 
    credentials: true 
}));
app.use(cookieParser());

app.use(express.json());

require('./db')

app.use("/api/auth", require("./Auth/Route"))
app.use("/basic", require("./Basic/Route"))

if (process.env.NODE_ENV === 'production') {

    // Have Node serve the files for our built React app
    app.use(express.static(path.resolve(__dirname, 'frontend/build')));

    //This one should be the last
    app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
    });

}

//process.env.PORT for deployment, 8000 for local development
app.listen(process.env.PORT || 8000, () => {
    console.log("server started on port 8000");
});