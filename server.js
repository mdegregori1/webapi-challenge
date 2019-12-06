const express = require('express');

// const postRouter = require("./posts/postRouter.js");
// const userRouter = require("./users/userRouter.js");


const server = express();

server.get('/', logger,  (req, res) => {
  res.send(`<h2>Sanity Test</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl} at ${ new Date().toISOString()}`)
  next();
}

server.use(express.json());
server.use(logger)
// server.use('/users', userRouter)
// server.use('/post', postRouter)

module.exports = server;
