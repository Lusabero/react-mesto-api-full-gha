const { celebrate, Joi, CelebrateError } = require('celebrate');
const { isValidObjectId } = require('mongoose');
const { isURL } = require('validator');

// eslint-disable-next-line no-useless-escape
const linkValidator = /(https*:\/\/)([\w-]{1,32}\.[\w-]{1,32})[^\s@]*#*/m;

const isValidId = Joi.custom((value) => {
  if (isValidObjectId(value)) return value;
  throw new CelebrateError('Неверный id');
});

const validateURL = (value) => {
  if (!isURL(value, { require_protocol: true })) {
    throw new CelebrateError('Неправильный формат ссылки');
  }
  return value;
};

const validateDataBaseId = celebrate({
  params: Joi.object().keys({
    id: isValidId,
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateURL).required(),
  }),
});

const validateCardInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(linkValidator).required(),
  }),
});

module.exports = {
  validateCardInfo,
  validateUser,
  validateUserAvatar,
  validateUserInfo,
  validateDataBaseId,
};
