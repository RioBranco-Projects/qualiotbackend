const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaCategory = new Schema({
  name: {
    type: String,
    required: true,
  },
  _idProduct: {
    type: String,
    required: true,
  },
  finalGrade: {
    type: Number,
    required: false,
  },
});

const Category = mongoose.model("Category", schemaCategory);

module.exports = Category;
