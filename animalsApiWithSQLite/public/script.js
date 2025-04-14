const buttonShowAnimals = document.getElementById("button_show_animals")
const showAnimals = document.getElementById("show_animals")

// buttonShowAnimals.addEventListener("click", () => {
//     fetch("http://127.0.0.1:3000/tiere", )
//     .then(res => res.json())
//     .then(data => displayData(data))

//     function displayData(data) {
//         console.log(data)
//     }
// });

buttonShowAnimals.addEventListener("click", async () => {
    const res = await fetch("http://127.0.0.1:3000/tiere")
    displayData(await res.json())

    function displayData(data) {
        console.log(data)
        showAnimals.innerHTML = "";
        data.forEach(tier => {
            console.log(tier)
            const li = document.createElement("li");
            li.textContent = tier.name;
            showAnimals.appendChild(li);
        });
    }
});

const tierForm = document.getElementById("tier_form")
const responseMsg = document.getElementById("response_msg")

tierForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newTier = {
        tierart: document.getElementById("tierart").value,
        name: document.getElementById("name").value,
        krankheit: document.getElementById("krankheit").value,
        age: parseInt(document.getElementById("age").value),
        gewicht: parseFloat(document.getElementById("gewicht").value)
    };

    try {
        const res = await fetch("http://127.0.0.1:3000/tiere", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTier)
        });

        if (res.ok) {
            responseMsg.textContent = "Tier erfolgreich hinzugefügt!";
            tierForm.reset();
        } else {
            responseMsg.textContent = "Fehler beim Hinzufügen.";
        }
    } catch (error) {
        responseMsg.textContent = "Fehler beim Verbinden mit dem Server.";
    }
});