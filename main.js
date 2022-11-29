const form = document.querySelector("#form");
const listItems = document.querySelector("#list");
const url = "http://localhost:3000/notes/";
let text = document.querySelector("#inputToDo");

keepList();
form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(text);
  postFetch();
});
//
//
// Add To List/DB Function
function postFetch() {
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "new task", body: text.value }),
  }).then((r) => r.json());
  keepList();
}
//
//
// Create Card Function
function keepList() {
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
}
//
//
// create card object
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
    //
    //
    // create delete button on card
    let delBtn = document.createElement("button");
    delBtn.classList.add("delBtn", "btn-floating", "red");
    card.appendChild(delBtn);
    delBtn.innerText = "X";
    //
    //
    // delete button event listener
    delBtn.addEventListener("click", function (event) {
      listItems.removeChild(card);
      let newUrl = url + object.id;
      fetch(newUrl, {
        method: "DELETE",
      }).then((response) => response.json());
    });
  }
}
