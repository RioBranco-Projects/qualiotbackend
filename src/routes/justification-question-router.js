const { Router } = require("express");

const {
  JustificationQuestionValidate,
  JustificationQuestionValidateID,
} = require("../middlewares/justification-question-validate");
const TokenAuthenticate = require("../middlewares/token-authenticate");
const JustificationQuestionController = require("../controllers/justification-question-controller");
const router = Router();

// Create justification
router.post(
  "/",
  TokenAuthenticate,
  JustificationQuestionValidate,
  JustificationQuestionController.create
);

// GetAll justification
router.get(
  "/get-by-question/:id",
  TokenAuthenticate,
  JustificationQuestionValidateID,
  JustificationQuestionController.getAll
);

// GetOne justification
router.get(
  "/:id",
  TokenAuthenticate,
  JustificationQuestionValidateID,
  JustificationQuestionController.getOne
);

// Update justification
router.put(
  "/:id",
  TokenAuthenticate,
  JustificationQuestionValidateID,
  JustificationQuestionController.update
);

// Delete justification
router.delete(
  "/:id",
  TokenAuthenticate,
  JustificationQuestionValidateID,
  JustificationQuestionController.delete
);

module.exports = router;
