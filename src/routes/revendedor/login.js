const Joi = require("joi");

module.exports = {
  method: "post",
  path: "/revendedor/login",
  handler: (req, h) => {
    //todo: authenticate
    return "login";
  },
  options: {
    validate: {
      payload: Joi.object({ //todo: login deve ser post de form e não json mas não vai dar tempo de arrumar
          email: Joi.string().email().required(),
          senha: Joi.string().required().min(6).max(20)
      })
    }
  }
};
