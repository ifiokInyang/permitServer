import Joi from "joi";

export const loadSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  company: Joi.string(),
  address: Joi.string(),
  bulb: Joi.number(),
  fan: Joi.number(),
  tv: Joi.number(),
  computer: Joi.number(),
  refrigerator: Joi.number(),
  freezer: Joi.number(),
  ac: Joi.number(),
  otherLoads: Joi.string(),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .label("email")
    .messages({ "string.only": "{{#label}} must be a valid email" }),
});

export const option = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};
