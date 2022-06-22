import { setState } from "./setState.js";

// EventListeners on Modal
const addBtn = document.querySelector("#add-btn");
const bookModal = document.querySelector("#book-modal");
const closeDialogBtn = document.querySelector("#close-dialog-btn");

closeDialogBtn.addEventListener("click", () => {
  bookModal.close();
});

addBtn.addEventListener("click", () => {
  bookModal.showModal();
});

//Rendering initApp
initApp();

function initApp() {
  const Library = getLibrary();
  setState(() => {}, Library);
}

function getLibrary() {
  let isLibraryEmpty = !JSON.parse(localStorage.getItem("library"));
  if (isLibraryEmpty) return [];
  return JSON.parse(localStorage.getItem("library"));
}

//get form data to add book to Library
const form = document.querySelector("form");

form.addEventListener("submit", () => {
  const Library = getLibrary();
  setState(() => {
    const data = document.querySelectorAll("input[data-book]");
    let book = [...data].reduce((previous, current) => {
      previous[current.name] =
        current.name === "read" ? current.checked : current.value;
      return previous;
    }, {});
    Library.push(book);
  }, Library);
});
