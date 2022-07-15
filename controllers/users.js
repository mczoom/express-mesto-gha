const User = require('../models/user');
// const BadRequestError = require('../errors/BadRequestError');
// const NotFoundError = require('../errors/NotFoundError');
// const DefaultError = require('../errors/DefaultError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params._id)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректные данные' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: 'Произошла ошибка' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.send({ message: err.message }));
};

module.exports.setUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch(() => res.send({ message: 'Произошла ошибка' }));
};

module.exports.setAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((url) => res.send({ data: url }))
    .catch(() => res.send({ message: 'Произошла ошибка' }));
};
