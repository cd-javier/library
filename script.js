// --------------------------
//   BASIC LIBRARY BEHAVIOR
// --------------------------

const myLibrary = [];

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.toggleRead = function () {
    this.read = !this.read;
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

addBookToLibrary(
  eveningsAndWeekends,
  swimmingInTheDark,
  buryYourGays,
  lasMalas
);

// --------------------------
//      QUERY SELECTORS
// --------------------------

const libraryDisplay = document.querySelector(".library");

const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formRead = document.querySelector("#read");
const addButton = document.querySelector("button");

const bookCards = libraryDisplay.getElementsByClassName("book");

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
    const buttonDelete = document.createElement("button");
    const buttonRead = document.createElement("button");

    card.dataset.libraryIndex = myLibrary.indexOf(book);

    card.classList.add("book");
    bookTitle.classList.add("title");
    bookAuthor.classList.add("author");
    bookPages.classList.add("pages");
    bookRead.classList.add("read");
    buttonDelete.classList.add("delete-button");
    buttonRead.classList.add("read-button");
    buttonDelete.textContent = "Delete";
    buttonRead.textContent = book.read ? "Not read" : "Read";

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
    card.appendChild(buttonDelete);
    card.appendChild(buttonRead);

    libraryDisplay.appendChild(card);
  }

  enableButtonBehavior();
}

function clearLibraryDisplay() {
  libraryDisplay.innerHTML = "";
}

function refreshLibraryDisplay() {
  clearLibraryDisplay();
  displayBooks();
}

// --------------------------
//       FROM BEHAVIOR
// --------------------------

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

    refreshLibraryDisplay();
    clearForm();
  }
}

// --------------------------
//      BUTTON BEHAVIOR
// --------------------------

function deleteBook(i) {
  myLibrary.splice(i, 1);
  refreshLibraryDisplay();
}

function enableButtonBehavior() {
  Array.from(bookCards).forEach((book) => {
    const i = book.dataset.libraryIndex;
    const deleteButton = book.querySelector(".delete-button");
    const readButton = book.querySelector(".read-button");
    const currentBook = myLibrary[i];

    deleteButton.addEventListener("click", () => {
      if (
        confirm(
          `Are you sure you want to delete ${currentBook.title} from your library?`
        )
      ) {
        myLibrary.splice(i, 1);
        refreshLibraryDisplay();
      }
    });

    readButton.addEventListener("click", () => {
      currentBook.toggleRead();
      refreshLibraryDisplay();
    });
  });
}

// --------------------------
//      EVENT LISTENERS
// --------------------------

document.addEventListener("DOMContentLoaded", displayBooks);
addButton.addEventListener("click", importBook);
