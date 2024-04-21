This is a practice app for learning Node.js, Express, MongoDB, and Heroku.

Steps:

- Node.js must be installed
- Create a back-end folder that's not a react app, create a package.json using npm init
- Inside the back-end folder, create a front-end folder using create-react-app
- install axios to the front-end
- Install nodemon, mongoose, express, dotenv, and cors to the back-end folder

1. Connecting to database
- Create a cluster on MongoDB
- Go to database access and get your password / create a user
- Make sure your IP is included in network access
- Create a collection, and insert some documents
- Go to database -> connect -> drivers and get the connection string. The connection string, including the password without the < >, go to an .env file that has to be added to .gitignore. In the string, add the specific database's (in collections) name to this part: mongodb.net/database-name-here
- In db.js, connect to MongoDB using mongoose

2. Express HTTP requests
- Require db.js in server.js
- Express HTTP requests are defined in server.js. These are API endpoints, not URLs where the users navigate to. You need a Schema that defines the data types
- App should listen to process.env.PORT || 8000, the former is for deployment, the latter is for local development
- In package.json, add to scripts: "start": "node server.js",

3. Front-end
- In the front-end folder in App.js, use axios to make HTTP requests. The address is the page's exact address, with e.g. /post that matches up with the Express request
- Set state, add JSX, etc.
- If you get cors problems, try clearing the browser's cache

4. Heroku
- Add to package.json scripts: "heroku-postbuild": "cd node-practice-frontend && npm install && npm run build", (node-practice-frontend is the front-end folder's name)
- Also add to package.json:   
    "engines": {
        "node": "20.10.0"
    }
- delete the .git folder from the frontend
- .gitignore node_modules of the back-end. git rm -r --cached . if you committed them by accident
- In server.js, have Node serve the files for our built React app
    app.use(express.static(path.resolve(__dirname, 'node-practice-frontend/build')));
- Also add a catch-all request to server.js:
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'node-practice-frontend/build', 'index.html'));
    });
- Push the app to Github
- Go to Heroku and create a new app
- Add the MongoDB URI to Heroku's config vars
- deploy from Github