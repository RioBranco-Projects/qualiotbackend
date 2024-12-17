const JustificationQuestionService = require("../service/justification-question-service");

const JustificationQuestionController = {
  create: async (req, res) => {
    try {
      const justificationQuestion = await JustificationQuestionService.create(
        req.body,
        req.user._id
      );

      if (justificationQuestion.error) {
        return res.status(justificationQuestion.code).json({
          code: justificationQuestion.code,
          message: "Error, while creating justification question",
          details: {
            controller: "JustificationQuestionController",
            cause: justificationQuestion.error.message,
          },
        });
      }

      return res.status(justificationQuestion.code).json({
        code: justificationQuestion.code,
        message: justificationQuestion.message,
        justificationQuestion: justificationQuestion.justificationQuestion,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while creating the justification question",
          details: {
            controller: "JustificationQuestionController",
            cause: error.message,
          },
        },
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const justificationQuestions = await JustificationQuestionService.getAll(
        req.user._id
      );

      if (justificationQuestions.error) {
        return res.status(justificationQuestions.code).json({
          code: justificationQuestions.code,
          message: "Error, while retrieving all justification questions",
          details: {
            controller: "JustificationQuestionController",
            cause: justificationQuestions.error.message,
          },
        });
      }

      return res.status(justificationQuestions.code).json({
        code: justificationQuestions.code,
        message: justificationQuestions.message,
        justificationQuestions: justificationQuestions.justificationQuestions,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while retrieving all justification questions",
          details: {
            controller: "JustificationQuestionController",
            cause: error.message,
          },
        },
      });
    }
  },

  getOne: async (req, res) => {
    try {
      const justificationQuestion = await JustificationQuestionService.getOne(
        req.params.id,
        req.user._id
      );

      if (justificationQuestion.error) {
        return res.status(justificationQuestion.code).json({
          code: justificationQuestion.code,
          message: "Error, while retrieving the justification question",
          details: {
            controller: "JustificationQuestionController",
            cause: justificationQuestion.error.message,
          },
        });
      }

      return res.status(justificationQuestion.code).json({
        code: justificationQuestion.code,
        message: justificationQuestion.message,
        justificationQuestion: justificationQuestion.justificationQuestion,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while retrieving the justification question",
          details: {
            controller: "JustificationQuestionController",
            cause: error.message,
          },
        },
      });
    }
  },

  update: async (req, res) => {
    try {
      const data = {
        title: req.body.title,
        justification: req.body.justification,
      };

      const justificationQuestion = await JustificationQuestionService.update(
        req.params.id,
        req.user._id,
        data
      );

      if (justificationQuestion.error) {
        return res.status(justificationQuestion.code).json({
          code: justificationQuestion.code,
          message: "Error, while updating the justification question",
          details: {
            controller: "JustificationQuestionController",
            cause: justificationQuestion.error.message,
          },
        });
      }

      return res.status(justificationQuestion.code).json({
        code: justificationQuestion.code,
        message: justificationQuestion.message,
        justificationQuestion: justificationQuestion.justificationQuestion,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while updating the justification question",
          details: {
            controller: "JustificationQuestionController",
            cause: error.message,
          },
        },
      });
    }
  },

  delete: async (req, res) => {
    try {
      const justificationQuestion = await JustificationQuestionService.delete(
        req.params.id,
        req.user._id
      );

      if (justificationQuestion.error) {
        return res.status(justificationQuestion.code).json({
          code: justificationQuestion.code,
          message: "Error, while deleting the justification question",
          details: {
            controller: "JustificationQuestionController",
            cause: justificationQuestion.error.message,
          },
        });
      }

      return res.status(justificationQuestion.code).json({
        code: justificationQuestion.code,
        message: justificationQuestion.message,
        justificationQuestion: justificationQuestion.justificationQuestion,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while deleting the justification question",
          details: {
            controller: "JustificationQuestionController",
            cause: error.message,
          },
        },
      });
    }
  },
};

module.exports = JustificationQuestionController;
