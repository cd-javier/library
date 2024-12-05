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
  books.forEach(book => myLibrary.push(book))
}

const theHusbands = new Book("The Husbands", "Holly Gramazio", 325, false);
const daisyJones = new Book(
  "Daisy Jones & The Six",
  "Taylor Jenkins Reid",
  368,
  true
);