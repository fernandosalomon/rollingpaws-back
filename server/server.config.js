const express = require("express");
const cors = require("cors");
require("../db/db.config");

class Server {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.static(`./public`));
  }

  routes() {
    this.app.use("/api/user", require("../routes/user.routes"));
    this.app.use("/api/pet", require("../routes/pet.routes"));
    this.app.use("/api/appointments", require("../routes/appointments.routes"));
    this.app.use("/api/doctor", require("../routes/doctor.routes"));
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Server OK. PORT: ", process.env.PORT);
    });
  }
}

module.exports = Server;
