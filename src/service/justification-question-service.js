const JustificationQuestion = require("../models/JustificationQuestion");

const JustificationQuestionService = {
  create: async (data, user) => {
    try {
      // Lógica para criar a JustificationQuestion
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  getAll: async (user) => {
    try {
      // Lógica para obter todas as JustificationQuestions
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  getOne: async (id, user) => {
    try {
      // Lógica para obter uma JustificationQuestion por ID
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  update: async (id, user, data) => {
    try {
      // Lógica para atualizar uma JustificationQuestion
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  delete: async (id, user) => {
    try {
      // Lógica para deletar uma JustificationQuestion
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
};

module.exports = JustificationQuestionService;
