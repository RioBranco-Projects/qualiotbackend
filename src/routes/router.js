const { Router } = require("express");
const router = Router();
const UserRouter = require("./user-router");
const ProductRouter = require("./product-router");
const CategoryRouter = require("./category-router");
const QuestionCategory = require("./question-category-router");

router.use("/users", UserRouter);
router.use("/products", ProductRouter);
router.use("/categorys", CategoryRouter);
router.use("/questions", QuestionCategory);

module.exports = router;
