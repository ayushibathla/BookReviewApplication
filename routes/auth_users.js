const express = require('express');
const regd_users = express.Router();
const authuserscontroller = require('../controller/auth_users')

regd_users.post("/login",authuserscontroller.login)      //only registered users can login

regd_users.put("/auth/review/:isbn",authuserscontroller.addreview);

exports.regd_users=regd_users;

