const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
    db.run(`CREATE TABLE animals (
    id INGETER PRIMARY KEY,
    species VARCHAR(50),
    name VARCHAR(100),
    sickness VARCHAR(50),
    age INTEGER,
    weight REAL);`)
    db.run(`INSERT INTO animals(species, name, sickness, age, weight) VALUES ("Dog", "Bello", "Cough", 5, 15)`)

    db.all(`SELECT * FROM animals`, (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            console.log(rows)
        }
    })

})


app.get("/", (req, res) => {
    res.send("Die API works")
})


app.get("/animals", (req, res) => {
    process.on("exit", () => {
        db.all(`SELECT * FROM animals`, (err, rows) => {
            if (err) {
                res.status(404).send("Mistake in your query question")
            } else {
                res.json(rows)
            }
        })
    })
})


app.post("/animals", (req, res) => {
    db.run(`INSERT INTO animals (species, name, sickness, age, weight) VALUES ("cat", "Gilly", "healthy", 2, 4)`)
    res.status(201).send("The animal has been succesfully added")
})



app.listen(3000)