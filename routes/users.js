const usersRouter = require('express').Router();
const {
  getUsers, getUser, updateUserInfo, setAvatar, getCurrentUser,
} = require('../controllers/users');
const { userInfoValidation, idValidation, avatarValidation } = require('../middlewares/validation');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', idValidation, getUser);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.patch('/users/me', userInfoValidation, updateUserInfo);
usersRouter.patch('/users/me/avatar', avatarValidation, setAvatar);

module.exports = usersRouter;
