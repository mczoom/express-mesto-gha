const mongoose = require('mongoose');
const { isEmail, isURL } = require('validator');
const bcrypt = require('bcryptjs');
const AuthoriseError = require('../errors/AuthoriseError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь ',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(url) {
        return isURL(url, { required_protocol: true });
      },
      message: 'Введите ссылку',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return isEmail(email);
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthoriseError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthoriseError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
