const express = require("express");
const cors = require("cors")
const app = express();
const fs = require("fs"); // This allows us to read and write files
app.use(express.json()); // our Middleware, allows us to read request we write in the body

// CORS (Cross origin resource sharing activate)
app.use(cors({            // to make it possible to fetch data from a database with a different Port
    origin: "http://localhost:5500"
}))

// helpfunction
function readFile() {
    const data = fs.readFileSync("books-database.json", "utf-8");
    return JSON.parse(data);
}

function writeFile(data) {
    // JSON.stringify changes a Javascript object into a JSON format
    fs.writeFileSync("books-database.json", JSON.stringify(data, null, 2));
}


// get Route to display all of the books:

app.get("/books", (req, res) => {
    try {
        const books = readFile();
        res.json(books)
    } catch (err) {
        res.status(500).json({ error: `Internal server Error: ${err}` })
    }


})


// post route to add an entire element to the database

app.post("/books", (req, res) => {

    try {
        const books = readFile()
        const { author, title } = req.body;


        // validate the data before we add a new book
        if (!(author && title)) {
            res.status(400).json({ error: `Author and Title must be filled` })
        }

        // Check if the book already exists in the database
        const titleExists = books.find((book) => books.title == title)
        if (titleExists) {
            res.status(400).json({ error: `The book ${title} is already in the database` })
        }


        // The title must be at least 3 characters long
        if (title.length < 3) {
            res.status(400).json({ error: `The title of the book must be minimum 3 characters long` })
        }

        const newBook = {
            id: books.length + 1,
            author: author,
            title: title
        }
        books.push(newBook)
        writeFile(books)
        res.status(201).json(newBook)


    } catch (err) {
        res.status(500).json({ error: `Internal Server Error: ${err}` })
    }
})

// now creating a third route - put, changing the existing element in a database

app.put("/books/:id", (req, res) => {
    try {
        const id = req.params.id;
        const books = readFile();
        const newTitle = req.body.title

        const foundBook = books.find(book => book.id === id);
        foundBook.title = newTitle
        res.json(books)
        writeFile(books)   // overriting in our json database
    } catch (err) {
        res.status(500).json({ error: `Internal Server Error: ${err}` })
    }
}
)


// now the delete route

app.delete("/books/:id", (req, res) => {



    const id = req.params.id;
    if (isNaN(id)) {
        res.status(400).json({ error: `ID has to be a number` })
    }



    const books = readFile();
    // here we can use either find or findIndex methode
    const foundBook = books.findIndex(book => book.id === id);
    if (foundBook == -1) {
        res.status(400).json({ error: `The Book doesn't exist` })
    }


    const deleteBook = books.splice(foundBook, 1);

    writeFile(books);

    res.json("You have succesfully deleted" + deleteBook[0].author + deleteBook[0].title)

})

// now let's try to make an additional Route with a search function using a query-parameter

app.get("/books/search", (req, res) => {
    const title = req.query.title;
    const books = readFile();
    const result = books.find((book) => book.title === title)
    res.json(result)

})


app.listen(5005);