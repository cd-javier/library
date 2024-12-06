// --------------------------
//   BASIC LIBRARY BEHAVIOR
// --------------------------

const myLibrary = [];

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    const hasRead = () => (read ? "read" : "not read yet");
    return `${this.title} by ${this.author}, ${this.pages} pages, ${hasRead()}`;
  };
}

function addBookToLibrary(...books) {
  books.forEach((book) => myLibrary.push(book));
}

const eveningsAndWeekends = new Book(
  "Evenings and Weekends",
  "Oisín McKenna",
  352,
  true
);

const swimmingInTheDark = new Book(
  "Swimming In The Dark",
  "Tomasz Jedrowski",
  256,
  true
);

const buryYourGays = new Book("Bury Your Gays", "Chuck Tingle", 304, true);

const lasMalas = new Book("Las Malas", "Camila Sosa Villada", 224, false);

addBookToLibrary(eveningsAndWeekends, swimmingInTheDark, buryYourGays, lasMalas);

// --------------------------
//      QUERY SELECTORS
// --------------------------

const libraryDisplay = document.querySelector(".library");

const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formRead = document.querySelector("#read");
const addButton = document.querySelector("button");

// --------------------------
//     DOM MANIPULATION
// --------------------------

function displayBooks() {
  for (let book of myLibrary) {
    const card = document.createElement("div");
    const bookTitle = document.createElement("div");
    const bookAuthor = document.createElement("div");
    const bookPages = document.createElement("div");
    const bookRead = document.createElement("div");

    card.classList.add("book");
    bookTitle.classList.add("title");
    bookAuthor.classList.add("author");
    bookPages.classList.add("pages");
    bookRead.classList.add("read");

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages
      ? book.pages + " pages"
      : "Unknown pages";
    bookRead.textContent = book.read ? "read" : "not read";

    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    card.appendChild(bookRead);

    libraryDisplay.appendChild(card);
  }
}

// --------------------------
//     FROM BEHAVIOR
// --------------------------

function clearLibraryDisplay() {
  libraryDisplay.innerHTML = "";
}

function clearForm() {
  formTitle.value = "";
  formAuthor.value = "";
  formPages.value = "";
  formRead.checked = false;
}

function importBook() {
  if (formTitle.value && formAuthor.value) {
    const newBook = new Book(
      formTitle.value,
      formAuthor.value,
      formPages.value,
      formRead.checked
    );

    addBookToLibrary(newBook);

    clearLibraryDisplay();
    displayBooks();
    clearForm();
  }
}

// --------------------------
//      EVENT LISTENERS
// --------------------------

document.addEventListener("DOMContentLoaded", displayBooks);
addButton.addEventListener("click", importBook);
