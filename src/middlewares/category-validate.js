const { isMongoID } = require("../utils/ValidationsUtils");

const CategoryValidate = async (req, res, next) => {
  try {
    const { name, _idProduct } = req.body;

    if (!name) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Error, while valide the category",
        details: {
          cause: "The name is required",
        },
      });
    }

    if (!_idProduct) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Error, while valide the category",
        details: {
          cause: "The _idProduct is required",
        },
      });
    }

    // Validando se o id enviado e um mongoID
    const isValidId = isMongoID(_idProduct);

    if (!isValidId.success) {
      return res.status(isValidId.error.code).json({
        code: isValidId.error.code,
        method: req.method,
        message: "Invalid category data",
        details: {
          cause: isValidId.error.details.cause,
        },
      });
    }

    req.category = {
      name,
      _idProduct,
      finalGrade : 0
    };

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        code: 500,
        method: req.method,
        message: "Error, while valide the category",
        details: {
          cause: error.message,
        },
      },
    });
  }
};

const CategoryValidateID = async (req, res, next) => {
  try {
    const isValidId = await isMongoID(req.params.id);

    if (!isValidId.success) {
      return res.status(isValidId.error.code).json({
        code: isValidId.error.code,
        method: req.method,
        message: "Invalid category data",
        details: {
          cause: isValidId.error.details.cause,
        },
      });
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        code: 500,
        method: req.method,
        message: "Error, while valide the category",
        details: {
          cause: error.message,
        },
      },
    });
  }
};

module.exports = { CategoryValidate, CategoryValidateID };
