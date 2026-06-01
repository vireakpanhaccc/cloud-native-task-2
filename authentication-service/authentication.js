const dbConnect = require('./dbconnect');
const PersonModel = require('./person_schema');
const express = require('express');
const app = express();
const port = 5002;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.json())

const JWT_SECRETE = process.env.JWT_SECRETE

/*
In the postman use the following URL
localhost:${port}/login

{
  "email":"a@gmail.com",
  "password":"abc",
  "role":"student"
}

*/

// LOGIN API
app.post("/login", (req, res) => {
  console.log(req.body.email)
  console.log(req.body.password)
  console.log(req.body.role)

  PersonModel.findOne({ "emailid": req.body.email, "role" : req.body.role})
    .then(getsearchdocument => {
      console.log(getsearchdocument)
      if (getsearchdocument) {
        bcrypt.compare(req.body.password, getsearchdocument.pass)
          .then(result => {
            if (result) {
              const token = jwt.sign({ email: req.body.email, role: req.body.role }, JWT_SECRETE, { expiresIn: '24h' })
              return res.json({ token })
            }
            else {
              res.status(400).send("Invalid user")
            }
          })
      }
      else {
        res.status(400).send("Invalid user")
      }
    }) //CLOSE THEN
}//CLOSE CALLBACK FUNCTION BODY
)//CLOSE Post METHOD

app.listen(port, () => {
    console.log(`Authentication Service Server is running on PORT NO: ${port}`)
})
