const express = require('express');
const router = express.Router();
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

// Services
const UsersService = require('../services/user.service');
const ApiKeyService = require('../services/apiKey.service');

// Middlewares
const validationHandler = require('../utils/middleware/validationHandler');

// Basic Strategy
require('../utils/auth/strategies/basic');

// Configuration
const { config } = require('../config');

// Schemas
const { createUserSchema } = require('../utils/schemas/user.schema');

router.post('/sign-in', async function (req, res, next) {
  const { apiKeyToken } = req.body;

  if (!apiKeyToken) {
    next(boom.unauthorized('apiKeyToken is required'));
  }

  passport.authenticate('basic', { session: false }, function (error, user) {
    try {
      if (error || !user) {
        next(boom.unauthorized());
        return;
      }
      req.logIn(user, { session: false }, async function (error) {
        if (error) {
          next(error);
          return;
        }
        const apiKeyService = new ApiKeyService();
        const scopes = await apiKeyService.getScopes({ token: apiKeyToken });

        if (!scopes) {
          next(boom.unauthorized());
        }

        const { id, identity_number: cedula, username, email, phone } = user;
        const payload = {
          sud: id,
          username,
          cedula,
          phone,
          email,
          scopes,
        };

        const access_token = jwt.sign(payload, config.authJwtSecret, {
          expiresIn: '3600s',
        });

        res.status(200).json({ access_token, user: { id, username, email, cedula, phone } });
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

router.post(
  '/sign-up',
  validationHandler(createUserSchema),
  async function (req, res, next) {
    const { body: user } = req;
    const { username, email, identity_number } = user;
    try {
      const userService = new UsersService();
      let userExists = await userService.getUserByUsername({ username });
      if(userExists) {
        res.status(202).json({ message: 'Username already exists' });
      }
      userExists = await userService.getUserByEmail({ email });
      if(userExists) {
        res.status(202).json({ message: 'Email already exists' });
      }
      userExists = await userService.getUserByIdentityNumber({ identity_number });
      if(userExists) {
        res.status(202).json({ message: 'Identity number already exists' });
      }
      if (!userExists) {
        const createdUserId = await userService.createUser({ user });
        if (createdUserId > 0) {
          res.status(201).json({
            user_id: createdUserId,
            message: 'user created successfully',
          });
        } else {
          res.status(202).json({
            message: 'error while creating user',
          });
        }
      } else {
        res.status(202).json({
          message: 'user already exists',
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
