const form = document.getElementById("form")
const authorInput = document.getElementById("author")
const titleInput = document.getElementById("title")
const answerField = document.getElementById("answer")

form.addEventListener("submit", (event) => {
    // to avoid resetting the placeholders
    event.preventDefault();
    alert(authorInput.value + " " + titleInput.value)

    fetch("http://localhost:5005/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: authorInput.value, title: titleInput.value })
    })
        .then(res => res.json())
        .then(data => {
            answerField.innerText = JSON.stringify(data)
        })
})

window.onload = () => {
    fetch("http://localhost:5005/books")
        .then(res => res.json())
        .then(data => {
            antwortFeld.innerText = JSON.stringify(data)
        })
}