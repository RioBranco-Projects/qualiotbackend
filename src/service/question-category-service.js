const Category = require("../models/Category");
const QuestionCategory = require("../models/QuestionCategory");
const CategoryService = require("./category-service");

const QuestionCategoryService = {
  create: async (dataQuestionCategory) => {
    try {
      // title, annouced, _idCategory

      console.log("data aq", dataQuestionCategory);
      const category = await Category.findById(
        dataQuestionCategory._idCategory
      );
      if (!category) {
        return {
          code: 404,
          error: {
            message: "Category not found",
          },
        };
      }

      const questionCategory = await QuestionCategory.create(
        dataQuestionCategory
      );

      return {
        code: 201,
        message: "Question created",
        questionCategory: questionCategory,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getByCategory: async (_idCategory, query) => {
    try {
      const { details = false } = query;
      const category = await Category.findById(_idCategory);
      if (!category) {
        return {
          code: 404,
          error: {
            message: "Category not found",
          },
        };
      }

      const questions = await QuestionCategory.find({
        _idCategory: _idCategory,
      });

      if (details !== "true") {
        return {
          code: 200,
          message: "Questions find",
          questionCategory: questions,
        };
      }

      const questionsDetails = [];
      for (const question of questions) {
        const category = await CategoryService.getOne(
          question._idCategory,
          query
        );
        if (category.error) {
          return category;
        }

        const questionDetail = {
          _id: question._id,
          title: question.title,
          announced: question.announced,
          category: category.category,
        };

        questionsDetails.push(questionDetail);
      }

      return {
        code: 200,
        message: "Questions find",
        questionCategory: questionsDetails,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getOne: async (_idQuestionCategory, query) => {
    try {
      const { details = false } = query;

      const question = await QuestionCategory.findById(_idQuestionCategory);
      if (!question) {
        return {
          code: 404,
          error: {
            message: "Question not found",
          },
        };
      }

      if (details !== "true") {
        return {
          code: 200,
          message: "Question find",
          questionCategory: question,
        };
      }

      const category = await CategoryService.getOne(
        question._idCategory,
        query
      );
      if (category.error) {
        return category;
      }

      const questionDetail = {
        _id: question._id,
        title: question.title,
        announced: question.announced,
        category: category.category,
      };

      return {
        code: 200,
        message: "Question find",
        questionCategory: questionDetail,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  update: async (_idQuestionCategory, dataUpdate) => {
    try {
      // Validar se existe a questao
      const question = await QuestionCategory.findById(_idQuestionCategory);
      if (!question) {
        return {
          code: 404,
          error: {
            message: "Question not found",
          },
        };
      }
      if (dataUpdate._idCategory) {
        // Validar se existe a categoria
        const category = await Category.findById(dataUpdate._idCategory);
        if (!category) {
          return {
            code: 404,
            error: {
              message: "Category not found",
            },
          };
        }
      }

      await question.updateOne(dataUpdate);

      return {
        code: 200,
        message: "Question updated",
        questionCategory: question,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  delete: async (_idQuestionCategory) => {
    try {
      const question = await QuestionCategory.findById(_idQuestionCategory);
      if (!question) {
        return {
          code: 404,
          error: {
            message: "Question not found",
          },
        };
      }

      await question.deleteOne();

      return {
        code: 200,
        message: "Question deleted with success",
        questionCategory: question,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
};

module.exports = QuestionCategoryService;
