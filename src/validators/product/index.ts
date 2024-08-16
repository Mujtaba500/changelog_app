import Joi from "joi";

const productValidator = {
  createProduct: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
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
  changeProductName: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
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

export default productValidator;
