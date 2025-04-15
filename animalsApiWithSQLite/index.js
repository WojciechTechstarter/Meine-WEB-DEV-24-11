const express = require("express");
const cors = require("cors");
const db = require("./db"); // <-- new file to PG

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// GET 
app.get("/tiere", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM tiere");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Fehler beim Abrufen der Tiere");
    }
});

// POST
app.post("/tiere", async (req, res) => {
    const { tierart, name, krankheit, age, gewicht } = req.body;
    try {
        await db.query(
            "INSERT INTO tiere (tierart, name, krankheit, age, gewicht) VALUES ($1, $2, $3, $4, $5)",
            [tierart, name, krankheit, age, gewicht]
        );
        res.status(201).send("Tier hinzugefügt");
    } catch (error) {
        console.error(error);
        res.status(500).send("Fehler beim Hinzufügen des Tiers");
    }
});

// DELETE
app.delete("/tiere/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await db.query("DELETE FROM tiere WHERE id = $1", [id]);
        res.send("Tier gelöscht");
    } catch (error) {
        console.error(error);
        res.status(500).send("Fehler beim Löschen des Tiers");
    }
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
