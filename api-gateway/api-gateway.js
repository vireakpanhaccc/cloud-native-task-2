const express = require('express');
const app = express()
const port = 4000

//USE PROXY SERVER TO REDIRECT THE INCOMMING REQUEST
const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer();

const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET;

function authToken(req, res, next) {
    console.log(req.headers.authorization)
    const header = req?.headers.authorization;
    const token = header && header.split(' ')[1];

    if (token == null) return res.status(401).json("Please send token");

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json("Invalid token", err);
        req.user = user;
        next()
    })
}

function authRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json("Unauthorized");
        }
        next();
    }
}

app.use('/reg', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:5001/reg' });
});

//REDIRECT TO THE STUDENT MICROSERVICE
app.use('/student',authToken, authRole('student'), (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3000' });
})
/*
{
  "email":"a@gmail.com",
  "password":"abc",
  "role":"student"
}
*/


//REDIRECT TO THE TEACHER MICROSERVICE
app.use('/teacher', authToken, authRole('teacher'),(req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3001' });
})
/*
{
  "email": "cd@gmail.com",
  "password": "cddsf",
  "role": "teacher"
}
*/
//REDIRECT TO THE LOGIN(Authentication) MICROSERVICE
app.use('/auth', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:5002' });
})

app.listen(port, () => {
    console.log(`API Gateway Service is running on PORT NO : ${port}`)
})