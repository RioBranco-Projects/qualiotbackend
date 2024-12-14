const { isMongoID } = require("../utils/ValidationsUtils");

const ProdutoValidate = (req, res, next) => {
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

    // if (!_idUser) {
    //   return res.status(400).json({
    //     code: 400,
    //     method: req.method,
    //     message: "Error, while valide the product",
    //     details: {
    //       cause: "The _idUser is required",
    //     },
    //   });
    // }

    // // Validando se o id enviado e um mongoID
    // const isValidId = isMongoID(_idUser);

    // if (!isValidId.success) {
    //   return res.status(isValidId.error.code).json({
    //     code: isValidId.error.code,
    //     method: req.method,
    //     message: "Invalid product data",
    //     details: {
    //       cause: isValidId.error.details.cause,
    //     },
    //   });
    // }

    req.product = {
      name,
      description,
      //   _idUser,
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

module.exports = { ProdutoValidate, ProductValidateID };
