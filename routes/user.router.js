const express = require('express');
const passport = require('passport');
const router = express.Router();

// Services
const UserService = require('../services/user.service');


// Middleware
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

// Schemas
const { updateUserSchema, 
  updateUserPasswordSchema, 
  updateUserProfileSchema 
} = require('../utils/schemas/user.schema');


router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:user:all']),
  async function (req, res, next) {
    try {
      const userService = new UserService();

      const users = await userService.getAll();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:me']),
  async function (req, res, next) {
    try {
      const { id } = req.user;

      const userService = new UserService();

      const user = await userService.getUserById({ id });
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/me',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['update:me']),
  validationHandler(updateUserSchema),
  async function (req, res, next) {
    try {
      const { id } = req.user;
      const { body: user } = req;

      const userService = new UserService();

      const userUpdated = await userService.updateUserById({ user, id });
      if (userUpdated && userUpdated[0] && userUpdated[0] > 0) {
        res.status(200).json({
          message: 'user updated successfully',
        });
      } else {
        res.status(202).json({
          message: 'error while updating user',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/me/pass',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['public']),
  validationHandler(updateUserPasswordSchema),
  async function (req, res, next) {
    try {
      const { id } = req.user;
      const { body: { password, new_password } } = req;
      const userService = new UserService();

      const userUpdated = await userService.updatePassbyUser({ password, new_password, id });
      if (userUpdated && userUpdated[0] && userUpdated[0] > 0) {
        res.status(200).json({
          message: 'user password updated successfully',
        });
      } else {
        res.status(202).json({
          message: 'error while updating user password',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/me/url_profile',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['public']),
  validationHandler(updateUserProfileSchema),
  async function (req, res, next) {
    try {
      const { id } = req.user;
      const { body: { url_profile } } = req;
      const user = { url_profile: url_profile };
      const userService = new UserService();

      const userUpdated = await userService.updateUserById({ user, id });
      if (userUpdated && userUpdated[0] && userUpdated[0] > 0) {
        res.status(200).json({
          message: 'user profile image updated successfully',
        });
      } else {
        res.status(202).json({
          message: 'error while updating user profile image',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
