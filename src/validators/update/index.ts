import Joi from "joi";

const updateValidator = {
  createUpdate: (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(30).required(),
      body: Joi.string().min(3).max(200).required(),
      productId: Joi.string().required(),
      status: Joi.string().valid("IN_PROGRESS", "SHIPPPED", "DEPRECATED"),
      version: Joi.string().allow(null),
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
      console.log(error);
      let customErrMessage = error.details[0].message;
      customErrMessage = customErrMessage
        .split("")
        .filter((char) => {
          let result = char.match(/^[a-z0-9A-Z ]+$/);
          return result;
        })
        .join("");

      return res.status(400).json({
        message: "Invalid Credentials",
        details: customErrMessage,
      });
    }
    next();
  },
  changeUpdate: (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(30),
      body: Joi.string().min(3).max(100),
      productId: Joi.string(),
      status: Joi.string().valid("IN_PROGRESS", "SHIPPPED", "DEPRECATED"),
      version: Joi.string().allow(null),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      console.log(error.message);
      let customErrMessage = error.details[0].message;
      customErrMessage = customErrMessage
        .split("")
        .filter((char) => {
          let result = char.match(/^[a-z0-9A-Z ]+$/);
          return result;
        })
        .join("");

      return res.status(400).json({
        message: "Invalid Credentials",
        details: customErrMessage,
      });
    }
    next();
  },
};

export default updateValidator;
