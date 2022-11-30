const form = document.querySelector("#form");
const listItems = document.querySelector("#list");
const url = "http://localhost:3000/notes/";
let text = document.querySelector("#inputToDo");
const body = document.querySelector("body");

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
    // create edit button
    let editBtn = document.createElement("button");
    editBtn.classList.add("editBtn", "btn-floating");
    card.appendChild(editBtn);
    editBtn.innerText = "✍️";
    //
    // make edit button work
    editBtn.addEventListener("dblclick", function (event) {
      name.contentEditable = true;
      editBtn.addEventListener("click", function (event) {
        name.contentEditable = false;
        let newUrl = url + object.id;
        console.log(name.innerText);
        fetch(newUrl, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body: `${name.innerText}` }),
        }).then((response) => response.json());
      });
    });
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
