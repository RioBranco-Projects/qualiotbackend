const { Router } = require("express");
const router = Router();
const UserRouter = require("./user-router");
const ProductRouter = require("./product-router");
const CategoryRouter = require("./category-router");

router.use("/user", UserRouter);
router.use("/product", ProductRouter);
router.use("/category", CategoryRouter);


module.exports = router;
