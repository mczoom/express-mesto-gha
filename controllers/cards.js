const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.name === 'ValidationError') {
        res.status(404).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.errorMessage });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    throw new NotFoundError('Карточка не найдена');
  })
  .then((likes) => res.status(200).send({ data: likes }))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Некорректные данные' });
    } else if (err.statusCode === 404) {
      res.status(404).send({ message: 'Произошла ошибка' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка' });
    }
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    throw new NotFoundError('Карточка не найдена');
  })
  .then((likes) => res.status(200).send({ data: likes }))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Некорректные данные' });
    } else if (err.statusCode === 404) {
      res.status(404).send({ message: 'Произошла ошибка' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка' });
    }
  });
