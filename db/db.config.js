const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => console.log("CONECTADO A LA BASE DE DATOS"))
  .catch((error) =>
    console.log("ERROR AL CONECTARSE A LA BASE DE DATOS", error)
  );

module.exports = mongoose;
