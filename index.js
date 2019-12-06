const server = require("./server");

const port = 4000;
server.listen(port, () => {
  console.log(`\n* The server is currently running on http://localhost:${port}*\n`);
});

