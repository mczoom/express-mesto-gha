const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ExistedLoginRegError = require('../errors/ExistedLoginRegError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.message);
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .orFail()
    .catch(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      if (card.owner.toString() === userId) {
        Card.findByIdAndRemove(cardId)
          .then((data) => res.send(data));
      } else {
        throw new ForbiddenError('Действие запрещено');
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    throw new NotFoundError('Карточка не найдена');
  })
  .then((likes) => res.send({ data: likes }))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Некорректные данные' });
    } else if (err.statusCode === 404) {
      res.status(404).send({ message: 'Произошла ошибка' });
    } else {
      res.status(500).send({ message: 'Ошибка сервера' });
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
  .then((likes) => res.send({ data: likes }))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Некорректные данные' });
    } else if (err.statusCode === 404) {
      res.status(404).send({ message: 'Произошла ошибка' });
    } else {
      res.status(500).send({ message: 'Ошибка сервера' });
    }
  });
