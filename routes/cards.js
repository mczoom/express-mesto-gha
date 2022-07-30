const cardsRouter = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardValidation, cardIdValidation } = require('../middlewares/validation');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', cardValidation, createCard);
cardsRouter.delete('/cards/:cardId', cardIdValidation, deleteCard);
cardsRouter.put('/cards/:cardId/likes', cardIdValidation, likeCard);
cardsRouter.delete('/cards/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = cardsRouter;
