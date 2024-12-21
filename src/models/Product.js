const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const produtoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  finalGrade: {
    type: Number,
    required: false,
  },
  _idUser: {
    type: String,
    required: true,
  },
});

const Produto = mongoose.model("Produto", produtoSchema);

module.exports = Produto;
