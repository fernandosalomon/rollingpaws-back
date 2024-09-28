const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {}

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Server OK. PORT: ", process.env.PORT);
    });
  }
}

module.exports = Server;
