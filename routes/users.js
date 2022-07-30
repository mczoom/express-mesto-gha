const usersRouter = require('express').Router();
const {
  getUsers, getUser, updateUserInfo, setAvatar, getCurrentUser,
} = require('../controllers/users');
const { userInfoValidation, userIdValidation, avatarValidation } = require('../middlewares/validation');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.get('/users/:userId', userIdValidation, getUser);
usersRouter.patch('/users/me', userInfoValidation, updateUserInfo);
usersRouter.patch('/users/me/avatar', avatarValidation, setAvatar);

module.exports = usersRouter;
