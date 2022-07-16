const usersRouter = require('express').Router();
const {
  getUsers, getUser, createUser, updateUserInfo, setAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', getUser);
usersRouter.post('/users', createUser);
usersRouter.patch('/users/me', updateUserInfo);
usersRouter.patch('/users/me/avatar', setAvatar);

module.exports = usersRouter;
