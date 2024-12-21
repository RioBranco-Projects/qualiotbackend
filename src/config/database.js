require("dotenv").config();
const mongoose = require("mongoose");

const dbconnect = async () => {
  try {
    const url =
      "mongodb+srv://vitor:I5M2Xa4KanrV9FFD@qualiot.tjzad.mongodb.net/?retryWrites=true&w=majority&appName=qualiot";

    await mongoose.connect(url);

    console.log("db conectado");
  } catch (error) {
    console.error(error);
  }
};

module.exports = dbconnect;
