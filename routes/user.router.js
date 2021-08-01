const express = require('express');
const passport = require('passport');
const router = express.Router();

// Services
const UserService = require('../services/user.service');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
    const userService = new UserService();

    const users = await userService.getAll();
    res.status(200).json(users);
  }
);

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
    const { id } = req.user;

    const userService = new UserService();

    const user = await userService.getUserById({ id });
    res.status(200).json(user);
  }
);

module.exports = router;
