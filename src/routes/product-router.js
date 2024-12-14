const { Router } = require("express");
const TokenAuthenticate = require("../middlewares/token-authenticate");
const ProductController = require("../controllers/product-controller");

const {
  ProductValidate,
  ProductValidateID,
} = require("../middlewares/product-validate");

const router = Router();

// Create produto
router.post("/", TokenAuthenticate, ProductValidate, ProductController.create);

// GetAll produto
router.get("/", TokenAuthenticate, ProductController.getAll);

// GetOne produto
router.get(
  "/:id",
  TokenAuthenticate,
  ProductValidateID,
  ProductController.getOne
);

// Update produto
router.put(
  "/:id",
  TokenAuthenticate,
  ProductValidateID,
  ProductController.update
);

// Delete produto
router.delete(
  "/:id",
  TokenAuthenticate,
  ProductValidateID,
  ProductController.delete
);

module.exports = router;
