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

function displayBooks() {
  const libraryDisplay = document.querySelector(".library");
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
    bookPages.textContent = book.pages;
    bookRead.textContent = book.read ? "read" : "not read";

    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    card.appendChild(bookRead);

    libraryDisplay.appendChild(card);

    console.log(card)
  }
}

const theHusbands = new Book("The Husbands", "Holly Gramazio", 325, false);
const daisyJones = new Book(
  "Daisy Jones & The Six",
  "Taylor Jenkins Reid",
  368,
  true
);

addBookToLibrary(theHusbands, daisyJones)


displayBooks();