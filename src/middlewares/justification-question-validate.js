const JustificationQuestionValidate = (req, res, next) => {
  try {
    const { justification, _idQuestionCategory } = req.body;

    if (!justification) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Error, while valide the justification",
        details: {
          cause: "The justification is required",
        },
      });
    }

    if (!_idQuestionCategory) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Error, while valide the justification",
        details: {
          cause: "The _idQuestionCategory is required",
        },
      });
    }

    // Validando se o id enviado e um mongoID
    const isValidId = isMongoID(_idQuestionCategory);

    if (!isValidId.success) {
      return res.status(isValidId.error.code).json({
        code: isValidId.error.code,
        method: req.method,
        message: "Invalid justification data",
        details: {
          cause: isValidId.error.details.cause,
        },
      });
    }

    req.justificationQuestion = {
      justification,
      _idQuestionCategory,
    };

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        code: 500,
        method: req.method,
        message: "Error, while valide the JustificationQuestionValidate",
        details: {
          cause: error.message,
        },
      },
    });
  }
};

const JustificationQuestionValidateID = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(isValidId.error.code).json({
        code: isValidId.error.code,
        method: req.method,
        message: "Invalid JustificationQuestion data",
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
        message: "Invalid JustificationQuestion data",
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
        message: "Error, while valide the JustificationQuestionID",
        details: {
          cause: error.message,
        },
      },
    });
  }
};

module.exports = {
  JustificationQuestionValidate,
  JustificationQuestionValidateID,
};
