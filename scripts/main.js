import { setState } from "./setState.js";

//Rendering initApp
initApp();

function initApp() {
  const Library = getLibrary();
  addModalEvents();
  setState(Library);
}

function getLibrary() {
  let library = JSON.parse(localStorage.getItem("library"));
  if (!library) return [];
  return library;
}

function addModalEvents() {
  // EventListeners on Modal
  const addBtn = document.querySelector("#add-btn");
  const bookModal = document.querySelector("#book-modal");
  const closeDialogBtn = document.querySelector("#close-dialog-btn");
  const form = document.querySelector("form");

  closeDialogBtn.addEventListener("click", () => {
    bookModal.close();
  });

  addBtn.addEventListener("click", () => {
    bookModal.showModal();
  });

  form.addEventListener("submit", (e) => {
    const Library = getLibrary();
    const data = document.querySelectorAll("input[data-book]");
    let book = [...data].reduce((previous, current) => {
      previous[current.name] =
        current.name === "read" ? current.checked : current.value;
      return previous;
    }, {});
    Library.push(book);
    setState(Library);
    e.target.reset();
  });
}
