const fs = require('fs');
const path = require('path');

const initialBooks = {
  1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} },
  2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
  3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
  4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
  5: {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
  6: {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
  7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
  8: {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
  9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
  10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
};

const booksFilePath = path.join('routes','books.json');

function readbooks() {
  if (!fs.existsSync(booksFilePath)) {
    writeBooks(initialBooks);
  }
  const booksData = fs.readFileSync(booksFilePath, 'utf-8');
  return JSON.parse(booksData);
}

function writebooks(books) {
  fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 4));
}

const books = readbooks();

module.exports = { books, writebooks };
