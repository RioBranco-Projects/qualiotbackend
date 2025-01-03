const { Router } = require("express");
const QuestionCategoryController = require("../controllers/question-category-controller");
const TokenAuthenticate = require("../middlewares/token-authenticate");
const {
  QuestionCategoryValidate,
  QuestionCategoryValidateID,
  QuestionCategoryValidateUpdateGrade,
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
  QuestionCategoryValidateID,
  QuestionCategoryController.getByCategory
);

// GetOneQuestion
router.get(
  "/:id",
  TokenAuthenticate,
  QuestionCategoryValidateID,
  QuestionCategoryController.getOne
);

// Update question
router.put(
  "/:id",
  TokenAuthenticate,
  QuestionCategoryValidateID,
  QuestionCategoryController.update
);

// Delete question
router.delete(
  "/:id",
  TokenAuthenticate,
  QuestionCategoryValidateID,
  QuestionCategoryController.delete
);

// Update grade question
router.patch(
  "/:id",
  TokenAuthenticate,
  QuestionCategoryValidateID,
  QuestionCategoryValidateUpdateGrade,
  QuestionCategoryController.updateGrade
);

module.exports = router;
