const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
// const DefaultError = require('../errors/DefaultError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  const userId = req.user._id;
  const { _cardId } = req.params;

  Card.findById(_cardId)
    .then((card) => {
      if (card.owner.toString() === userId) {
        Card.findByIdAndRemove(_cardId)
          .then((cardData) => res.send(cardData));
      }
    })
    .catch(() => res.send({ message: 'Произошла ошибка' }));
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
