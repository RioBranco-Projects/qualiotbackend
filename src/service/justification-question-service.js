const JustificationQuestion = require("../models/JustificationQuestion");
const QuestionCategory = require("../models/QuestionCategory");
const QuestionCategoryService = require("./question-category-service");

const JustificationQuestionService = {
  create: async (dataJustication, user) => {
    try {
      // justificativa
      // _idQuestionCategory
      // Validar se existe a questão
      const question = await QuestionCategory.findById(
        dataJustication._idQuestionCategory
      );
      if (!question) {
        return {
          code: 404,
          error: {
            message: "Question not found",
          },
        };
      }

      // Validar se ja existe uma justificativa para essa pergunta
      const isExistJustification = await JustificationQuestion.findOne({
        _idQuestionCategory: question._id,
      });

      if (isExistJustification) {
        return {
          code: 400,
          error: {
            message: "Justification already created",
          },
        };
      }

      const justification = await JustificationQuestion.create(dataJustication);

      return {
        code: 201,
        message: "Justification created",
        justificationQuestion: justification,
      };
      // Lógica para criar a JustificationQuestion
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  getAll: async (_idQuestionCategory, query) => {
    try {
      const { details } = query;
      // Lógica para obter todas as JustificationQuestions

      const justifications = await JustificationQuestion.find({
        _idQuestionCategory: _idQuestionCategory,
      });

      if (details !== "true") {
        return {
          code: 200,
          message: "All justifications",
          justificationQuestions: justifications,
        };
      }

      const justificationsDetails = [];

      for (const justification of justifications) {
        const question = await QuestionCategoryService.getOne(
          justification._idQuestionCategory,
          query
        );
        if (question.error) {
          return question;
        }

        const justficationDetail = {
          _id: justification._id,
          justification: justification.justification,
          questionCategory: question.questionCategory,
        };

        justificationsDetails.push(justficationDetail);
      }

      return {
        code: 200,
        message: "All justifications",
        justificationQuestions: justificationsDetails,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  getOne: async (id, query) => {
    try {
      const { details } = query;

      const justification = await JustificationQuestion.findById(id);
      if (!justification) {
        return {
          code: 404,
          error: {
            message: "Justification not found",
          },
        };
      }

      if (details !== "true") {
        return {
          code: 200,
          message: "Justification finded",
          justificationQuestion: justification,
        };
      }

      const question = await QuestionCategoryService.getOne(
        justification._idQuestionCategory,
        query
      );

      if (question.error) {
        return question;
      }

      const justficationDetail = {
        _id: justification._id,
        justification: justification.justification,
        questionCategory: question.questionCategory,
      };

      return {
        code: 200,
        message: "Justification finded",
        justificationQuestion: justficationDetail,
      };

      // Lógica para obter uma JustificationQuestion por ID
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  update: async (id, data) => {
    try {
      const justification = await JustificationQuestion.findById(id);
      if (!justification) {
        return {
          code: 404,
          error: {
            message: "Justification not found",
          },
        };
      }

      if (data._idQuestionCategory) {
        // Validando se existe essa pergunta
        const question = await QuestionCategory.findById(
          data._idQuestionCategory
        );
        if (!question) {
          return {
            code: 404,
            error: {
              message: "Question not found",
            },
          };
        }

        // Validando se essa pergunta ja tem alguma justificativa
        const isExistJustification = await JustificationQuestion.findOne({
          _idQuestionCategory: question._id,
        });

        if (isExistJustification) {
          return {
            code: 400,
            error: {
              message: "Already justification",
            },
          };
        }
      }

      await justification.updateOne(data);

      return {
        code: 200,
        message: "Justification updated",
        justificationQuestion: justification,
      };

      // Lógica para atualizar uma JustificationQuestion
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  delete: async (id, user) => {
    try {
      const justification = await JustificationQuestion.findById(id);
      if (!justification) {
        return {
          code: 404,
          error: {
            message: "Justification not found",
          },
        };
      }

      await justification.deleteOne();

      return {
        code: 200,
        message: "Justification deleted",
        justificationQuestion: justification,
      };
      // Lógica para deletar uma JustificationQuestion
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
};

module.exports = JustificationQuestionService;
