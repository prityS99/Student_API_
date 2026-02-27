const Joi = require("joi");

const StudentValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  standard: Joi.string().min(1).max(8).required(),
  address: Joi.string().min(4).max(10).required(),
});


module.exports={StudentValidation}