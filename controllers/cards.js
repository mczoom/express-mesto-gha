const Card = require('../models/card');

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
  .then((likes) => res.send({ data: likes }))
  .catch(() => res.send({ message: 'Произошла ошибка' }));

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((likes) => res.send({ data: likes }))
  .catch(() => res.send({ message: 'Произошла ошибка' }));
