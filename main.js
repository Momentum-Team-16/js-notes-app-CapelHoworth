const form = document.querySelector("#form");
const listItems = document.querySelector("#list");
const url = "http://localhost:3000/notes/";

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let text = document.querySelector("#inputToDo").value;
  console.log(text);

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "new task", body: `${text}` }),
  }).then((r) => r.json());

  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      loadObject(data);
    });

  // // create card object
  function loadObject(objects) {
    listItems.replaceChildren();
    for (let object of objects) {
      let card = document.createElement("div");
      card.classList.add("card");
      let name = document.createElement("div");
      name.classList.add("card-title");
      name.innerText = object.body;
      card.appendChild(name);
      listItems.appendChild(card);
    }
  }
});
