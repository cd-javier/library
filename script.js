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

const libraryDisplay = document.querySelector(".library");
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

const theHusbands = new Book("The Husbands", "Holly Gramazio", 325, false);
const daisyJones = new Book(
  "Daisy Jones & The Six",
  "Taylor Jenkins Reid",
  368,
  true
);

addBookToLibrary(theHusbands, daisyJones);

displayBooks();

const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formRead = document.querySelector("#read");

function importBook() {
  const newBook = new Book(formTitle.value, formAuthor.value, formPages.value, formRead.checked)
  
  addBookToLibrary(newBook)

  clearLibraryDisplay();
  displayBooks();
  clearForm();
}

function clearLibraryDisplay () {
  libraryDisplay.innerHTML = "";
}

function clearForm () {
  formTitle.value = "";
  formAuthor.value = "";
  formPages.value = "";
  formRead.checked = false;
}

const addButton = document.querySelector("button");

addButton.addEventListener("click", importBook);

/* 
Crear un const para cada elemento del form
crear un libro con todo lo que se ha añadido
meter el libro en la librería
vaciar el display de librería
volver a llenarlo de nuevo
vaciar los elementos del form
*/
