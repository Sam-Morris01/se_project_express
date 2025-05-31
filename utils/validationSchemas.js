const { celebrate, Joi } = require('celebrate');

const signupSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const signinSchema = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const updateUserSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
  }),
});

const createItemSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    weather: Joi.string().required().valid('hot', 'cold', 'warm'),
    imageUrl: Joi.string().required().uri(),
  }),
});

const itemIdParamSchema = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  signupSchema,
  signinSchema,
  updateUserSchema,
  createItemSchema,
  itemIdParamSchema,
};