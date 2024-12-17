const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schemaJustificationQuestion = new Schema({
  justification: {
    type: String,
    required: true,
  },
  _idQuestionCategory: {
    type: String,
    required: true,
  },
});

const JustificationQuestion = mongoose.model(
  "JustificationQuestion",
  schemaJustificationQuestion
);

module.exports = JustificationQuestion;
