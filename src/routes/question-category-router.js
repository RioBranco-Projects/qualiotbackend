const { Router } = require("express");
const QuestionCategoryController = require("../controllers/question-category-controller");
const TokenAuthenticate = require("../middlewares/token-authenticate");
const {
  QuestionCategoryValidate,
} = require("../middlewares/question-category-validate");
const router = Router();

// Create question
router.post(
  "/",
  TokenAuthenticate,
  QuestionCategoryValidate,
  QuestionCategoryController.create
);

// GetAllByCategory
router.get(
  "/get-by-category/:id",
  TokenAuthenticate,
  QuestionCategoryController.getByCategory
);

// GetOneQuestion
router.get("/:id", TokenAuthenticate, QuestionCategoryController.getOne);

// Update question
router.put("/:id", TokenAuthenticate, QuestionCategoryController.update);

// Delete question
router.delete("/:id", TokenAuthenticate, QuestionCategoryController.delete);

module.exports = router;
