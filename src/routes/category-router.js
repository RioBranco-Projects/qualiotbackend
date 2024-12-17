const { Router } = require("express");
const {
  CategoryValidate,
  CategoryValidateID,
} = require("../middlewares/category-validate");
const CategoryController = require("../controllers/category-controller");
const TokenAuthenticate = require("../middlewares/token-authenticate");
const router = Router();

// Create category
router.post(
  "/",
  TokenAuthenticate,
  CategoryValidate,
  CategoryController.create
);

// getOne category
router.get(
  "/:id",
  TokenAuthenticate,
  CategoryValidateID,
  CategoryController.getOne
);

// getByProduct category
router.get(
  "/get-by-product/:id",
  TokenAuthenticate,
  CategoryValidateID,
  CategoryController.getByProduct
);

// Update category
router.put(
  "/:id",
  TokenAuthenticate,
  CategoryValidateID,
  CategoryController.update
);

// Delete category
router.delete(
  "/:id",
  TokenAuthenticate,
  CategoryValidateID,
  CategoryController.delete
);

module.exports = router;
