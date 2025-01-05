const { Router } = require("express");
const UserController = require("../controllers/user-controller");
const {
  UserValidate,
  UserValidateID,
} = require("../middlewares/user-validate");
const router = Router();

// Create user
router.post("/", UserValidate, UserController.create);

// getAll user
router.get("/", UserController.getAll);

// getOne user
router.get("/:id", UserValidateID, UserController.getOne);

// update user
router.put("/:id", UserValidateID, UserController.update);

// delete user
router.delete("/:id", UserValidateID, UserController.delete);

// login user
router.post("/login", UserController.login);

module.exports = router;
