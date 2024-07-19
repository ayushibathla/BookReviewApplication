let isValid = require("./auth_users").isValid;
let users = require("./auth_users").users;
let books = require("../routes/booksdb");

exports.getallproducts = (req, res) => {
  return res.status(200).json(Object.values(books));
}

exports.getparticularproduct = (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json(book);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
}

exports.getproductbyauthor = (req, res) => {
  const author = req.params.author;
  const bookbyauthor = Object.values(books).filter(book => book.author === author);
  if (bookbyauthor.length > 0) {
    return res.status(200).json(bookbyauthor);
  } else {
    return res.status(404).json({ message: "No books found by this author" });
  }
}

exports.getproductbytitle = (req, res) => {
  const title = req.params.title;
  const bookbytitle = Object.values(books).filter(book => book.title === title);
  if (bookbytitle.length > 0) {
    return res.status(200).json(bookbytitle);
  } else {
    return res.status(404).json({ message: "No books found with this title" });
  }
}

exports.getreviewbyisbn = (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book && book.reviews) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({ message: "No reviews found for this ISBN" });
  }
};

exports.register = (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res.status(200).json({ message: "User successfully registered" });
    } else {
      return res.status(404).json({ message: "User already exists" });
    }
  } else {
    return res.status(400).json({ message: "Username and password are required" });
  }
};
