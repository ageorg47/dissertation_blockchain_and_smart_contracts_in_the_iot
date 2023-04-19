//Import the necessary libraries to set up the express server and initialize the web3 object
const express = require("express");
const http = require("http");
const cors = require("cors");
const defaultRouter = require("./api_endpoints");

//Set up the express server
const app = express();
const server = http.createServer(app);
const port = 3000;
app.use(cors({ origin: true }));
app.use("/", defaultRouter);

//Start the server
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
