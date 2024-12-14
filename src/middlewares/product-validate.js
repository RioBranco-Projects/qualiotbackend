const { isMongoID } = require("../utils/ValidationsUtils");

const ProductValidate = (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Error, while valide the product",
        details: {
          cause: "The name is required",
        },
      });
    }

    req.product = {
      name,
      description,
      finalNote: 0,
    };

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        code: 500,
        method: req.method,
        message: "Error, while valide the product",
        details: {
          cause: error.message,
        },
      },
    });
  }
};

const ProductValidateID = async (req, res, next) => {
  try {
    const isValidId = await isMongoID(req.params.id);

    if (!isValidId.success) {
      return res.status(isValidId.error.code).json({
        code: isValidId.error.code,
        method: req.method,
        message: "Invalid product data",
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
        message: "Error, while valide the product",
        details: {
          cause: error.message,
        },
      },
    });
  }
};

module.exports = { ProductValidate, ProductValidateID };
