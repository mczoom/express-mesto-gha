const cardsRouter = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardValidation, idValidation } = require('../middlewares/validation');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', cardValidation, createCard);
cardsRouter.delete('/cards/:cardId', idValidation, deleteCard);
cardsRouter.put('/cards/:cardId/likes', idValidation, likeCard);
cardsRouter.delete('/cards/:cardId/likes', idValidation, dislikeCard);

module.exports = cardsRouter;
