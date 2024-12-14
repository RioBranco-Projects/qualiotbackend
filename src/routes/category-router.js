const { Router } = require("express");
const {
  CategoryValidate,
  CategoryValidateID,
} = require("../middlewares/category-validate");
const CategoryController = require("../controllers/category-controller");
const router = Router();

// Create category
router.post("/", CategoryValidate, CategoryController.create);

// getAll category
router.get("/", CategoryController.getAll);

// getOne category
router.get("/:id", CategoryValidateID, CategoryController.getOne);

// getByProduct category
router.get(
  "/get-by-product/:id",
  CategoryValidateID,
  CategoryController.getByProduct
);

// Update category
router.put("/:id", CategoryValidateID, CategoryController.update);

// Delete category
router.delete("/:id", CategoryValidateID, CategoryController.delete);

module.exports = router;
