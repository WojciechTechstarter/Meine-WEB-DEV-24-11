const express = require("express")
const app = express()
const sqlite3 = require("sqlite3")

const db = new sqlite3.Database("tiere.db")

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tiere (
        id INTEGER PRIMARY KEY,
        tierart VARCHAR(50),
        name VARCHAR(50),
        krankheit VARCHAR(100),
        age INT,
        gewicht REAL
    )`);

    db.get("SELECT COUNT(*) as count FROM tiere", (err, row) => {
        if (err) {
            console.error("Fehler beim Prüfen der Tabelle:", err);
            return;
        }

        if (row.count === 0) {
            db.run(`INSERT INTO tiere(tierart, name, krankheit, age, gewicht)
                    VALUES ("Hund", "Bello", "husten", 5, 12.4)`);
        }
    });

    selectAllTiereQuery = `SELECT * FROM tiere`;
});

// app.get("/", (req, res) => {
//     res.send("Die API funktioniert!")
// })

app.get("/tiere", (req, res) => {
    db.all(selectAllTiereQuery, (err, rows) => {
        if (err) {
            res.status(404).send("Fehler in deiner Query Anfrage")
        } else {
            res.json(rows)
        }
    })
})

app.use(express.json()) // Middleware to parse JSON bodies
app.use(express.static("public"))

app.get("/tiere/:id", (req, res) => {
    const id = req.params.id
    const query = `SELECT * FROM tiere WHERE id = ?`
    db.get(query, [id], (err, row) => {
        if (err) {
            res.status(500).send("Datenbankfehler")

        } else if (!row) {
            res.status(404).send("Tier nicht gefunden")
        }
        else {
            res.json(row)
        }
    })
})

app.put("/tiere/:id", (req, res) => {
    const id = req.params.id
    const query = `UPDATE tiere SET tierart = ?, 
                 name = ?, krankheit = ?, age = ?, gewicht = ? WHERE id = ?`
    const { tierart, name, krankheit, age, gewicht } = req.body

    db.run(query, [tierart, name, krankheit, age, gewicht, id], function (err) {
        if (err) {
            res.status(404).send("Fehler beim Aktualisieren")
        } else if (this.changes === 0) {
            res.status(404).send("Tier nicht gefunden")
        } else {
            res.send("Tier wurde aktualisiert")
        }
    })
})


app.delete("/tiere/:id", (req, res) => {
    const id = req.params.id
    const query = `DELETE FROM tiere WHERE id = ?`

    db.run(query, [id], function (err) {
        if (err) {
            res.status(404).send("Fehler beim Aktualisieren")
        } else if (this.changes === 0) {
            res.status(404).send("Tier nicht gefunden")
        } else {
            res.send("Tier wurde entfernt")
        }
    })
})


app.post("/tiere", (req, res) => {
    const { tierart, name, krankheit, age, gewicht } = req.body
    db.run(`INSERT INTO tiere (tierart,name,krankheit,age,gewicht) VALUES(?,?,?,?,?)`, [tierart, name, krankheit, age, gewicht])
    res.status(201).send("Tier wurde erfolgreich hinzugefügt")
})
app.listen(3000)

