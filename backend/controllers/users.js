const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { ApiError } = require('../errors/ApiError');

const { JWT_SECRET = 'some-secret-key' } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => {
      throw ApiError.defaultError();
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw ApiError.notFoundError(
        'Запрашиваемый пользователь не найден (некорректный id)',
      );
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw ApiError.badRequestError('Пользователь с указанным id не существует.');
      }
      throw err;
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw ApiError.notFoundError(
        'Запрашиваемый пользователь не найден (некорректный id)',
      );
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw ApiError.badRequestError('Что-то пошло не так...');
      }
      throw err;
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }).then((user) => {
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw ApiError.badRequestError(
          'Введены некорректные данные, невозможно создать пользователя, проверьте имя, описание и аватар на валидность.',
        );
      }
      if (err.code === 11000) {
        throw ApiError.conflictError('Пользователь уже зарегистрирован.');
      }
      throw ApiError.defaultError();
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw ApiError.notFoundError(
        'Запрашиваемый пользователь не найден (некорректный id)',
      );
    })
    .then((user) => {
      res.status(200).send({ name: user.name, about: user.about });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw ApiError.badRequestError(
          'Введены некорректные данные, невозможно обновить данные пользователя, проверьте корректность указанных имени и описания.',
        );
      }
      throw err;
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw ApiError.notFoundError(
        'Запрашиваемый пользователь не найден (некорректный id)',
      );
    })
    .then((user) => res.status(200).send({ avatar: user.avatar }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw ApiError.badRequestError(
          'Введены некорректные данные, невозможно обновить аватар, проверьте корректность указанной ссылки.',
        );
      }
      throw err;
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res
        .cookie('jwt', token, {
          expires: new Date(Date.now() + 7 * 24 * 3600000),
          httpOnly: true,
          sameSite: true,
        })
        .status(200)
        .send({ token });
    })
    .catch(() => {
      throw ApiError.badRequestError('Неправильный логин или пароль');
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  getCurrentUser,
};
