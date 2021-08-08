const express = require('express');
const passport = require('passport');
const router = express.Router();

// Services
const UserService = require('../services/user.service');

// Middleware
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');
const { updateUserSchema } = require('../utils/schemas/user.schema');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:user:all']),
  async function (req, res, next) {
    const userService = new UserService();

    const users = await userService.getAll();
    res.status(200).json(users);
  }
);

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:me']),
  async function (req, res, next) {
    const { id } = req.user;

    const userService = new UserService();

    const user = await userService.getUserById({ id });
    res.status(200).json(user);
  }
);

router.put(
  '/me',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['update:me']),
  validationHandler(updateUserSchema),
  async function(req, res, next) {
    const { id } = req.user;
    const { body: user } = req;

    const userService = new UserService();
    
    const userUpdated = await userService.updateUserById({ user, id });
    if(userUpdated && userUpdated[0] && userUpdated[0] > 0) {
      res.status(200).json({
        message: 'user updated successfully'
      });
    } else {
      res.status(202).json({
        message: 'error while updating user',
      });
    }
  }
)

module.exports = router;
