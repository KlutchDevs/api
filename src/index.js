// index.js
// This is the main entry point of our application
const express = require('express'); //dependency
const app = express(); //create app object

/*We then use the app object’s get method to
instruct our application to send a response of 
“Hello World” when a user accesses the root URL (/). */

app.get('/', (req, res) => res.send('Hello World'));
//instruct app to run on specific port
app.listen(4000, () => console.log("Antonio's Listening on port 4000!"));
