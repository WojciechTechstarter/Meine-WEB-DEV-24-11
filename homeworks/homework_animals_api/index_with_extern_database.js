// This is the same file as the index.js just here, I will try to use the extern database - animals.json
// this one I will run using node index_with_extern_database.js


const express = require("express")
const app = express();

// Middleware to parse JSON in POST requests
app.use(express.json())

// creating our "database" - here we will try to import the database from extern file
// done with ChatGPT...
// after looking at it for some time, I will wait untill we disciuss it during classes...

const fs = require("fs");
const path = require("path");

const animalsPath = path.join(__dirname, "animals.json");

function readAnimals() {
    const data = fs.readFileSync(animalsPath, "utf-8");
    return JSON.parse(data);
}


// creating the first route - getting the whole list with animals

app.get("/animals", (req, res) => {
    const animals = readAnimals()
    res.json(animals)
})


// second route - getting only "searched" animals

app.get("/animals/search", (req, res) => {
    const species = req.query.species;
    const getFillterSpecies = animals.filter(animal => animal.species === species);
    res.json(getFillterSpecies)
})


// thrid route - gettind elements by id

app.get("/animals/:id", (req, res) => {
    const id = req.params.id
    const foundAnimal = animals.find((animal) => animal.id == id)

    if (foundAnimal) {
        res.json(foundAnimal);
    } else {
        res.status(404).send("The animal with the given ID could not be found. ID: " + id);
    }
})


// For the last route we will try to add a new element to the array - an animal
// here instead of get we use post (request?/command)

app.post("/animals", (req, res) => {
    const { name, species, age, color } = req.body; // Destructing??
    const newAnimal = {
        id: animals.length + 1,
        name: name,
        species: species,
        age: age,
        color: color,
    }

    animals.push(newAnimal)

    res.json(animals)
})




// starting a server

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
})
