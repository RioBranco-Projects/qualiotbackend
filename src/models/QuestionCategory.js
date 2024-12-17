const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schemaQuestionCategory = Schema({
  title: {
    type: String,
    required: true,
  },
  announced: {
    type: String,
    required: true,
  },
  _idCategory: {
    type: String,
    required: true,
  },
});

const QuestionCategory = mongoose.model(
  "QuestionCategory",
  schemaQuestionCategory
);

module.exports = QuestionCategory;
