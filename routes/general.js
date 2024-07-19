const express = require('express');

const public_users = express.Router();
const generalcontroller = require('../controller/general')

public_users.post('/register',generalcontroller.register);

public_users.get('/',generalcontroller.getallproducts)

public_users.get('/isbn/:isbn',generalcontroller.getparticularproduct);

public_users.get('/author/:author',generalcontroller.getproductbyauthor);

public_users.get('/title/:title',generalcontroller.getproductbytitle);

public_users.get('/review/:isbn',generalcontroller.getreviewbyisbn);


exports.public_users = public_users;