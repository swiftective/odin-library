const Library = getLibrary();

addModalEvents();

Library.forEach((book) => {
  addCard(book);
});

function getLibrary() {
  let library = JSON.parse(localStorage.getItem("library"));
  if (!library) return [];
  return library;
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = new Date().getTime();
}

function addModalEvents() {
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
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.read) {
      data.read = true;
    } else {
      data.read = false;
    }

    const book = new Book(data.title, data.author, data.pages, data.read);

    Library.push(book)
    localStorage.setItem("library", JSON.stringify(Library));
    addCard(book)

    e.target.reset();
    bookModal.close();
  });
}

function addCard(book) {
  const bookElement = createCard(book, book.id);
  const container = document.querySelector("#content-container");
  container.appendChild(bookElement);
}

function createCard(obj, id) {
  const { title, author, pages, read } = obj;
  let bookCard = document.createElement("div");
  bookCard.classList = "book";
  if (read) bookCard.classList.add("read");
  bookCard.setAttribute("data-id", id);

  let bookRemoveBtn = document.createElement("div");
  bookRemoveBtn.classList = "book-remove-btn";

  bookRemoveBtn.addEventListener("click", (e) => {
    let book = e.target.parentNode;
    let bookID = parseInt(book.getAttribute("data-id"));
    let index = Library.findIndex((book) => book.id == bookID);
    Library.splice(index, 1);
    localStorage.setItem("library", JSON.stringify(Library));
    book.remove();
  });

  bookCard.appendChild(bookRemoveBtn);

  let bookName = document.createElement("div");
  bookName.innerText = title;
  bookCard.appendChild(bookName);

  let authorName = document.createElement("div");
  authorName.innerText = author;
  bookCard.appendChild(authorName);

  let pageNum = document.createElement("div");
  pageNum.innerText = pages + " pages";
  bookCard.appendChild(pageNum);

  let label = document.createElement("label");
  label.classList = "switch";

  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");

  checkbox.addEventListener("change", (e) => {
    const bookCard = e.target.closest(".book");
    const id = parseInt(bookCard.getAttribute("data-id"));
    bookCard.classList.toggle("read");
    const index = Library.findIndex(item => item.id == id)
    Library[index].read = e.target.checked;
    localStorage.setItem("library", JSON.stringify(Library));
  });

  checkbox.checked = read;

  let span = document.createElement("span");
  span.classList = "slider round";

  label.appendChild(checkbox);
  label.appendChild(span);

  bookCard.appendChild(label);

  return bookCard;
}
