const jwt = require('jsonwebtoken');
let {books,writebooks} = require("../routes/booksdb");
let users = [];

const isValid = (username)=>{
  let userwithsamename = users.filter((user)=>{
    return user.username = username
  })
  if(userwithsamename.length>0){
    return true;
  }
  else{
    return false;
  }
}
const authenticatedUser = (username,password)=>{
  let validusers = users.filter((user)=>{
    return (user.username == username && user.password == password);
  })

  if(validusers.length>0){
    return true;
  }
  else{
    return false;
  }
}
exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({ data: username }, process.env.JWT_SECRET || 'default_jwt_secret', { expiresIn: '1h' });

    req.session.authorization = { accesstoken: accessToken };
    req.session.user = { username }; 

    return res.status(200).json({ message: "User successfully logged in" });
  } else {
    return res.status(401).json({ message: "Invalid login. Check username and password" });
  }
};

exports.addreview = (req, res) => {
  const isbn = req.params.isbn;
  const user = req.session.user;
  const { review } = req.body;

  if (!user) {
    return res.status(403).send("You must be logged in to post a review.");
  }

  if (!books[isbn]) {
    return res.status(404).send("Book not found");
  }

  const username = user.username;

  if (!books[isbn].reviews) {
    books[isbn].reviews = {};
  }

  books[isbn].reviews[username] = review;
  writebooks(books);
  return res.status(200).send(books[isbn]);
};

module.exports.isValid = isValid;
module.exports.users = users;