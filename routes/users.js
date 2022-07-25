const usersRouter = require('express').Router();
const {
  getUsers, getUser, updateUserInfo, setAvatar, getCurrentUser,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', getUser);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.patch('/users/me', updateUserInfo);
usersRouter.patch('/users/me/avatar', setAvatar);

module.exports = usersRouter;
