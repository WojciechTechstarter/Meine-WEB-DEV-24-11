const express = require("express");
const app = express();
const fs = require("fs"); // This allows us to read and write files
app.use(express.json()); // our Middleware, allows us to read request we write in the body


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
    const books = readFile();
    res.json(books)
})


// post route to add an entire element to the database

app.post("/books", (req, res) => {
    const books = readFile()
    const { author, title } = req.body;

    if (author && title) {
        const newBook = {
            id: books.length + 1,
            author: author,
            title: title
        }
        books.push(newBook)
        writeFile(books)
        res.status(201).json(newBook)
    }
    else {
        res.send("Data missing")
    }

})

// now creating the thirds route - put, changing the existing element in a database

app.put("/books/:id", (req, res) => {
    const id = req.params.id;
    const books = readFile();
    const newTitle = req.body.title

    const foundBook = books.find(book => book.id == id);
    foundBook.title = newTitle
    res.json(books)
    writeFile(books)   // overriting in our json database
})


// now the delete route

app.delete("/books/:id", (req, res) => {
    const id = req.params.id;
    const books = readFile();
    // here we can use either find or findIndex methode
    const foundBook = books.findIndex(book => book.id == id);
    const deleteBook = books.splice(foundBook, 1);

    writeFile(books); // not sure what it does exactly

    res.json("You have succesfully deleted" + deleteBook[0].author + deleteBook[0].title)

})

// now let's try to make an additional Route with a search function using a query-parameter

app.get("/books/search", (req, res) => {
    const title = req.query.title;
    const books = readFile();
    const result = books.find((book) => book.title == title)
    res.json(result)

})


app.listen(5005);