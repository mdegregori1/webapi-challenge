const express = require('express');

const projectRouter = require("./router/project-router.js");
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
server.use('/api/project', projectRouter)
// server.use('/users', userRouter)


module.exports = server;
