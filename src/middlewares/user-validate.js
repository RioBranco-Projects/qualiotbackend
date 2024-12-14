const { isEmail, isMongoID } = require("../utils/ValidationsUtils");

const UserValidate = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(400).json({
      code: 400,
      method: req.method,
      message: "Error, while valide the User",
      details: {
        cause: "The name is required",
      },
    });
  }

   // Validando o email
   if (!email) {
    return res.status(400).json({
      code: 400,
      method: req.method,
      message: "Error, while valide the User",
      details: {
        cause: "The email is required",
      },
    });
  }
  const isEmailValid = await isEmail(email);
  if (!isEmailValid) {
    return res.status(400).json({
      code: 400,
      method: req.method,
      message: "Error, while valide the User",
      details: {
        cause: "The email not valid",
      },
    });
  }

  if (!password) {
    return res.status(400).json({
      code: 400,
      method: req.method,
      message: "Error, while valide the User",
      details: {
        cause: "The password is required",
      },
    });
  }

  

  req.user = {
    name,
    email,
    password
  }
  return next();
};

const UserValidateID = async (req, res, next) => {
    try {

        const isValidId = await isMongoID(req.params.id);
    
        if (!isValidId.success) {
          return res.status(isValidId.error.code).json({
            code: isValidId.error.code,
            method: req.method,
            message: "Invalid user data",
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
            message: "Error, while valide the user",
            details: {
              cause: error.message,
            },
          },
        });
    }
};

module.exports = { UserValidate, UserValidateID };
