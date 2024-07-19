const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const generalrouter = require('./routes/general');
const customerrouter = require('./routes/auth_users');

const session = require('express-session');

const app = express();

app.use(express.json());    

app.use(session({secret:"fingerprint_customer",resave:true,saveUninitialized:true}));

app.use('/customer/auth/*',function authenticatedUser(req,res,next){
  if (req.session.authorization) {
    let token = req.session.authorization['accesstoken'];

    jwt.verify(token, process.env.JWT_SECRET || "default_jwt_secret", (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ message: "User not authenticated", error: err.message });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
})
app.use('/customer',customerrouter.regd_users)
app.use('/',generalrouter.public_users)
const PORT =  process.env.PORT || 8080;

app.listen(PORT,()=>{
  console.log("Server started");
})


//req.session.authorization
// User Authentication: After a user logs in successfully, their authentication details (e.g., user ID, roles, permissions) are stored in the session. This information is often stored in req.session.authorization.

// Access Control: During subsequent requests, the server can check req.session.authorization to determine if the user has the necessary permissions to access certain resources or perform specific actions.

