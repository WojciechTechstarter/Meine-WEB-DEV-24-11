const express = require("express")
const app = express();

// importing the generateName function out of the sillyname packet
const generateName = require("sillyname")

// creating the first standar route

app.get("/", (req, res) => {
    res.send("Welcome to my first API!")
})

// creating the second route
//json is a standart format to transfer files between frontend and backend

app.get("/data", (req, res) => {
    res.json([
        { id: 1, name: "Wojciech" },
        { id: 2, name: "Marek" }
    ]);
})



// creatin a new route with sillyname

app.get("/randomname", (req, res) => {
    const randomName = generateName();
    res.send(`Your random name is: ${randomName}`)  //Working!
})


// Now let's try something else, like returning a personalised message - reading form URL 

app.get("/greet/:name", (req, res) => {     // :name is a dynamic part of the route
    const userName = req.params.name;       // getting the value the user has put in the URL
    res.send(`Hello, ${userName}`)          // returning the value
})




// starting a server at port 5005
// when succesfully started then returning a message in the console

app.listen(5005, () => {
    console.log("The server is running at http://localhost:5005")
})



