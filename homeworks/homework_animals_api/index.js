const express = require("express")
const app = express();

// Middleware to parse JSON in POST requests
app.use(express.json())

// creating our "database"

const animals = [
    { id: 1, name: "Zak", species: "dog", age: "8", color: "dark-brown" },
    { id: 2, name: "Belly", species: "cat", age: "3", color: "white" },
    { id: 3, name: "Ivy", species: "parrot", age: "4", color: "mixed" },
    { id: 4, name: "Lucy", species: "dog", age: "1", color: "grey" },
]

// creating the first route - getting the whole list with animals

app.get("/animals", (req, res) => {
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
