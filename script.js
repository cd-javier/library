// --------------------------
//   BASIC LIBRARY BEHAVIOR
// --------------------------

const myLibrary = [];

// Book Constructor
class Book {
  constructor (title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  toggleRead() {
    this.read = !this.read;
  }
}

// Add book to library
function addBookToLibrary(...books) {
  books.forEach((book) => myLibrary.push(book));
}

// Populate the library with default books
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
const lasMalas = new Book(
  "Bad Girls (Las Malas)",
  "Camila Sosa Villada",
  224,
  false
);

// Add default books to the library
addBookToLibrary(
  eveningsAndWeekends,
  swimmingInTheDark,
  buryYourGays,
  lasMalas
);

// Library stats
function getTotalCount() {
  return myLibrary.length;
}

function getReadCount() {
  const readBooks = myLibrary.filter((book) => book.read);
  return readBooks.length;
}

function getUnreadCount() {
  const unreadBooks = myLibrary.filter((book) => !book.read);
  return unreadBooks.length;
}

// --------------------------
//      QUERY SELECTORS
// --------------------------

const libraryDisplay = document.querySelector(".library");

const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formRead = document.querySelector("#read");
const bookForm = document.querySelector("#new-book");

const bookCards = libraryDisplay.getElementsByClassName("book");

// --------------------------
//     DOM MANIPULATION
// --------------------------

// Display each book in the library
function displayBooks() {
  for (let book of myLibrary) {
    // Create book card and its contents
    const card = document.createElement("div");
    const bookTitle = document.createElement("div");
    const bookAuthor = document.createElement("div");
    const bookPages = document.createElement("div");
    const bookRead = document.createElement("div");
    const buttonDelete = document.createElement("button");
    const buttonRead = document.createElement("button");

    // Give a data value to each card with its index in the library
    card.dataset.libraryIndex = myLibrary.indexOf(book);

    // Give classes to all the elements
    card.classList.add("book");
    bookTitle.classList.add("title");
    bookAuthor.classList.add("author");
    bookPages.classList.add("pages");
    bookRead.classList.add("read");
    buttonDelete.classList.add("delete-button");
    buttonRead.classList.add("read-button");

    // Add text to the buttons
    buttonDelete.textContent = "Delete";
    buttonRead.textContent = book.read ? "Mark as unread" : "Mark as read";

    // Add text to the elements
    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages
      ? book.pages + " pages"
      : "Unknown pages";
    bookRead.textContent = book.read ? "read" : "not read";

    // Create the read bookmark
    const bookmark = document.createElement("div");
    bookmark.classList.add("bookmark");
    bookmark.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="23" height="30" viewBox="0 0 23 30" fill="none">
<path d="M0 30V3.33336C0 2.4167 4.33295e-06 0 4.33295e-06 0C4.33295e-06 0 2.38319 0.0011424 3.28564 3.12924e-05C3.28564 3.12924e-05 18.8103 3.12924e-05 19.7139 3.12924e-05C20.6174 3.12924e-05 22.9995 9.46719e-05 22.9995 9.46719e-05C22.9995 9.46719e-05 23.0006 2.41781 22.9995 3.33336V30L11.4998 25L0 30Z" />
</svg>`;

    // Build the card
    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    card.appendChild(bookRead);
    card.appendChild(buttonDelete);
    card.appendChild(buttonRead);
    if (book.read) card.appendChild(bookmark);

    // Display the card in the library
    libraryDisplay.appendChild(card);
  }

  // Refresh stats
  addStats();

  // Enable delete and read buttons
  enableButtonBehavior();
}

// Refresh the content of the library
function refreshLibraryDisplay() {
  libraryDisplay.innerHTML = "";
  displayBooks();
}

// Add stats
function addStats() {
  const totalCount = document.getElementById("total-count");
  const readCount = document.getElementById("read-count");
  const unreadCount = document.getElementById("unread-count");

  totalCount.textContent = getTotalCount();
  readCount.textContent = getReadCount();
  unreadCount.textContent = getUnreadCount();
}

// --------------------------
//       FROM HANDLING
// --------------------------

// Creates a book from the values in the form
function importBook() {
  const newBook = new Book(
    formTitle.value,
    formAuthor.value,
    formPages.value,
    formRead.checked
  );

  // Adds the book to the library
  addBookToLibrary(newBook);
}

// Submit the form
bookForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents the default behavior of the form
  importBook();
  refreshLibraryDisplay(); // Refreshes the display
  bookForm.reset(); // Resets the form
});

// --------------------------
//      BUTTON BEHAVIOR
// --------------------------

// Enables the behavior of the Delete and Read buttons
function enableButtonBehavior() {
  Array.from(bookCards).forEach((book) => {
    const i = book.dataset.libraryIndex; // Finds the index in the library of the book
    const deleteButton = book.querySelector(".delete-button");
    const readButton = book.querySelector(".read-button");
    const currentBook = myLibrary[i];

    deleteButton.addEventListener("click", () => {
      if (
        // Prompt to confirm that the user wants to delete
        confirm(
          `Are you sure you want to delete ${currentBook.title} from your library?`
        )
      ) {
        myLibrary.splice(i, 1); // Removes the book from the library
        refreshLibraryDisplay(); // Refreshes the display
      }
    });

    readButton.addEventListener("click", () => {
      currentBook.toggleRead(); // Toggles the 'read' property
      refreshLibraryDisplay(); // Refreshes the display
    });
  });
}

// --------------------------
//      EVENT LISTENERS
// --------------------------

// Displays the books when the page loads
document.addEventListener("DOMContentLoaded", displayBooks);

// --------------------------
//       MOBILE FORM
// --------------------------

const newBtn = document.querySelector(".new-button");
const formArea = document.querySelector(".form");
const overlay = document.querySelector(".overlay");
const cancelBtn = document.querySelector(".cancel-button");

// Show-Hide form overlay
function showForm() {
  formArea.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
}

newBtn.addEventListener("click", showForm);
cancelBtn.addEventListener("click", () => {
  bookForm.reset();
  showForm();
});

// Close overlay when submitting form
bookForm.addEventListener("submit", () => {
  formArea.classList.add("hidden");
  overlay.classList.add("hidden");
});
