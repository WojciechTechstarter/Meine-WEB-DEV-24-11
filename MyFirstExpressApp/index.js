const express = require("express");
const app = express();
const giveMeAJoke = require("give-me-a-joke");

//CRUD
// C = Create -> Erstellen ->> Post
// R = Read -> Lesen ->> GET
// U = Update -> Daten updaten ->> PUT
// D = Delete -> Löschen ->> DELETE

app.get("/", (req, res) => {
    res.send(404);
});
app.get("/joke", (req, res) => {
    giveMeAJoke.getRandomDadJoke(function (joke) {
        res.send(joke);
    });
});

app.get("/people", (req, res) => {
    res.send("Du hast erfolgreich die /people Route angesprochen lieber Marcus!");
});
function handleHallo(req, res) {
    res.send("Hallo aus der Hallo Route");
}

app.get("/hallo", handleHallo);

app.get("/hallo2", function (req, res) {
    res.send("Hallo aus hallo2");
});
// Arrow Function
app.get("/hallo3", (req, res) => {
    console.log(req);
    res.send("Hallo aus hallo3");
});
// people/Api/frankfurt/
// : -> um paramter zu erwarten
app.get("/people/:id", (req, res) => {
    res.send("Du hast die Person mit folgender ID gesucht: " + req.params.id);
});

// Query wird in der URL mit einem "?" gestartet und kann im Request ausgelesen werden unter req.query
app.get("/query/", (req, res) => {
    res.send(req.query);
});

const users = [
    { id: 1, name: "Nassima", city: "Berlin" },
    { id: 2, name: "Suheib", city: "Frankfurt" },
    { id: 3, name: "Dustin", city: "Buxtehude" },
    { id: 4, name: "Alex", city: "Erfurt" },
    { id: 5, name: "Marcel", city: "Erfurt" },
];

app.get("/users/search", (req, res) => {
    const city = req.query.city;
    const result = users.filter((user) => user.city == city);
    res.json(result);
});

// Eine Suchroute, die nach Städte Filtern kann
app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    const foundUser = users.find((user) => user.id == id);

    if (foundUser) {
        res.json(foundUser);
    } else {
        res.status(404).send("User mit deiner ID nicht gefunden. ID: " + id);
    }
});
app.use(express.json()); // -> Ermöglicht, dass ein Body über den Request mitgeschickt wird

app.post("/users", (req, res) => {
    const { city, name } = req.body; // Destructuring
    const newUser = {
        id: users.length + 1,
        name: name,
        city: city,
    };

    users.push(newUser);

    res.json(users);
});

app.listen(5005);