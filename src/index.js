// index.js
// This is the main entry point of our application
const express = require('express'); //dependency

const app = express(); //create app object
const port = process.env.PORT || 4000;

/*We then use the app object’s get method to
instruct our application to send a response of 
“Hello World” when a user accesses the root URL (/). */

app.get('/', (req, res) => res.send("Lets see if nodemon is working. -Klutch"));
//instruct app to run on specific port
app.listen(port, () => 
    console.log("Server running at http://localhost:${port}")
);
