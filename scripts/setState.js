export function setState(callback, arr) {
  callback();
  updateLocalStorage(arr);
  renderUI(JSON.parse(localStorage.getItem("library")));
}

const contentContainer = document.querySelector("#content-container");

function renderUI(arr) {
  removeAllCards();

  if (arr === []) return;

  arr.forEach((obj, index) => {
    addCard(createCard(obj, index));
  });
  addListeners(arr);
}

function removeAllCards() {
  contentContainer.innerHTML = "";
}

function addCard(element) {
  contentContainer.appendChild(element);
}

function createCard(obj, index) {
  const { book, author, pages, read } = obj;
  let bookCard = document.createElement("div");
  bookCard.classList = "book";
  if (read) bookCard.classList.add("read");
  bookCard.setAttribute("data-id", index);

  let bookRemoveBtn = document.createElement("div");
  bookRemoveBtn.classList = "book-remove-btn";
  bookCard.appendChild(bookRemoveBtn);

  let bookName = document.createElement("div");
  bookName.innerText = book;
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
  checkbox.checked = read;
  let span = document.createElement("span");
  span.classList = "slider round";

  label.appendChild(checkbox);
  label.appendChild(span);

  bookCard.appendChild(label);

  return bookCard;
}

function updateLocalStorage(arr) {
  localStorage.setItem("library", JSON.stringify(arr));
}

function addListeners(arr) {
  const removeBtns = document.querySelectorAll(".book-remove-btn");
  removeBtns.forEach((removeBtn) => {
    removeBtn.addEventListener("click", (e) => {
      let bookID = parseInt(e.target.parentNode.getAttribute("data-id"));
      arr.splice(bookID, 1);
      e.target.parentNode.remove();
      setState(() => {}, arr);
    });
  });

  const checkboxes = document.querySelectorAll(
    "input[type=checkbox]:not(#checkbox)"
  );
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const bookCard = this.parentNode.parentNode;
      const id = parseInt(bookCard.getAttribute("data-id"));
      bookCard.classList.toggle("read");
      arr[id].read = this.checked;
      localStorage.setItem("library", JSON.stringify(arr));
    });
  });
}
