const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        res.send('Такого пользователя не существует');
        return;
      }

      res.send({ data: user });
    })
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ name: user.name, about: user.about, avatar: user.avatar }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.setUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.setAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((url) => res.send({ data: url }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
