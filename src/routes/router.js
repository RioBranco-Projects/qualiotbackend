const { Router } = require("express");
const router = Router();
const UserRouter = require("./user-router");
const ProductRouter = require("./product-router");
const CategoryRouter = require("./category-router");
const QuestionCategoryRouter = require("./question-category-router");
const JustificationQuestionRouter = require("./justification-question-router");

router.use("/users", UserRouter);
router.use("/products", ProductRouter);
router.use("/categorys", CategoryRouter);
router.use("/questions", QuestionCategoryRouter);
router.use("/justifications", JustificationQuestionRouter);

module.exports = router;
