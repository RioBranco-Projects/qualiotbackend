const { isMongoID } = require("../utils/ValidationsUtils");

const QuestionCategoryValidate = (req, res, next) => {
  try {
    const { title, announced, _idCategory } = req.body;

    if (!title) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Error, while valide the question category",
        details: {
          cause: "The title is required",
        },
      });
    }

    if (!announced) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Error, while valide the question category",
        details: {
          cause: "The announced is required",
        },
      });
    }

    if (!_idCategory) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Error, while valide the question category",
        details: {
          cause: "The _idCategory is required",
        },
      });
    }

    // Validando se o id enviado e um mongoID
    const isValidId = isMongoID(_idCategory);

    if (!isValidId.success) {
      return res.status(isValidId.error.code).json({
        code: isValidId.error.code,
        method: req.method,
        message: "Invalid question category data",
        details: {
          cause: isValidId.error.details.cause,
        },
      });
    }

    req.questionCategory = {
      title,
      announced,
      _idCategory,
    };

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        code: 500,
        method: req.method,
        message: "Error, while valide the question category",
        details: {
          cause: error.message,
        },
      },
    });
  }
};

const QuestionCategoryValidateID = async (req, res, next) => {
  try {

    if(!req.params.id){
      return res.status(isValidId.error.code).json({
        code: isValidId.error.code,
        method: req.method,
        message: "Invalid QuestionCategory data",
        details: {
          cause: "This id is required",
        },
      });
    }

    const isValidId = await isMongoID(req.params.id);


    
    if (!isValidId.success) {
      return res.status(isValidId.error.code).json({
        code: isValidId.error.code,
        method: req.method,
        message: "Invalid QuestionCategory data",
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
        message: "Error, while valide the QuestionCategoryID",
        details: {
          cause: error.message,
        },
      },
    });
  }
};



module.exports = {QuestionCategoryValidate, QuestionCategoryValidateID}