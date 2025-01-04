const QuestionCategoryService = require("../service/question-category-service");

const QuestionCategoryController = {
  create: async (req, res) => {
    try {
      const questionCategory = await QuestionCategoryService.create(
        req.questionCategory
      );

      if (questionCategory.error) {
        return res.status(questionCategory.code).json({
          code: questionCategory.code,
          message: "Error, while create question category",
          details: {
            controller: "QuestionCategoryController",
            cause: questionCategory.error.message,
          },
        });
      }

      return res.status(questionCategory.code).json({
        code: questionCategory.code,
        message: questionCategory.message,
        questionCategory: questionCategory.questionCategory,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while create the question category",
          details: {
            controller: "QuestionCategoryController",
            cause: error.message,
          },
        },
      });
    }
  },
  getByCategory: async (req, res) => {
    try {
      const questionCategory = await QuestionCategoryService.getByCategory(
        req.params.id,
        req.query
      );

      if (questionCategory.error) {
        return res.status(questionCategory.code).json({
          code: questionCategory.code,
          message: "Error, while getByCategory category",
          details: {
            controller: "QuestionCategoryController",
            cause: questionCategory.error.message,
          },
        });
      }

      return res.status(questionCategory.code).json({
        code: questionCategory.code,
        message: questionCategory.message,
        questionCategory: questionCategory.questionCategory,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while getByCategory category",
          details: {
            controller: "QuestionCategoryController",
            cause: error.message,
          },
        },
      });
    }
  },
  getOne: async (req, res) => {
    try {
      const questionCategory = await QuestionCategoryService.getOne(
        req.params.id,
        req.query
      );

      if (questionCategory.error) {
        return res.status(questionCategory.code).json({
          code: questionCategory.code,
          message: "Error, while getOne question category",
          details: {
            controller: "QuestionCategoryController",
            cause: questionCategory.error.message,
          },
        });
      }

      return res.status(questionCategory.code).json({
        code: questionCategory.code,
        message: questionCategory.message,
        questionCategory: questionCategory.questionCategory,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while getOne the question category",
          details: {
            controller: "QuestionCategoryController",
            cause: error.message,
          },
        },
      });
    }
  },
  update: async (req, res) => {
    try {
      const dataUpdate = {
        title: req.body.title,
        announced: req.body.announced,
        _idCategory: req.body._idCategory,
        note: req.body.note,
      };

      const questionCategory = await QuestionCategoryService.update(
        req.params.id,
        dataUpdate
      );

      if (questionCategory.error) {
        return res.status(questionCategory.code).json({
          code: questionCategory.code,
          message: "Error, while update question category",
          details: {
            controller: "QuestionCategoryController",
            cause: questionCategory.error.message,
          },
        });
      }

      return res.status(questionCategory.code).json({
        code: questionCategory.code,
        message: questionCategory.message,
        questionCategory: questionCategory.questionCategory,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while update the question category",
          details: {
            controller: "QuestionCategoryController",
            cause: error.message,
          },
        },
      });
    }
  },
  delete: async (req, res) => {
    try {
      const questionCategory = await QuestionCategoryService.delete(
        req.params.id
      );

      if (questionCategory.error) {
        return res.status(questionCategory.code).json({
          code: questionCategory.code,
          message: "Error, while delete question category",
          details: {
            controller: "QuestionCategoryController",
            cause: questionCategory.error.message,
          },
        });
      }

      return res.status(questionCategory.code).json({
        code: questionCategory.code,
        message: questionCategory.message,
        questionCategory: questionCategory.questionCategory,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while delete the question category",
          details: {
            controller: "QuestionCategoryController",
            cause: error.message,
          },
        },
      });
    }
  },
  updateGrade: async (req, res) => {
    try {
      const questionCategory = await QuestionCategoryService.updateGrade(
        req.params.id,
        req.grade
      );

      if (questionCategory.error) {
        return res.status(questionCategory.code).json({
          code: questionCategory.code,
          message: "Error, while update grade question category",
          details: {
            controller: "QuestionCategoryController",
            cause: questionCategory.error.message,
          },
        });
      }

      return res.status(questionCategory.code).json({
        code: questionCategory.code,
        message: questionCategory.message,
        questionCategory: questionCategory.questionCategory,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while update grade the question category",
          details: {
            controller: "QuestionCategoryController",
            cause: error.message,
          },
        },
      });
    }
  },
};

module.exports = QuestionCategoryController;
