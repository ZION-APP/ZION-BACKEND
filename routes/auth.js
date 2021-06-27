const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const UsersService = require('../services/users');
const validationHandler = require('../utils/middleware/validationHandler');

const { config } = require('../config');
const { createUserSchema } = require('../utils/schemas/users');

// Basic Strategy
require('../utils/auth/strategies/basic');

function authApi(app) {
    const router = express.Router();
    app.use('/api/auth', router);

    router.post('/sign-in', async function(req, res, next) {
        passport.authenticate('basic', { session: false }, function(error, user) {
            try{
                if(error || !user){
                    next(boom.unauthorized());
                }
                req.logIn(user, {session: false}, async function(error) {
                    if(error) {
                        next(error);
                    }

                    const {id, name, email} = user;
                    const payload = {
                        sud: id,
                        name,
                        email
                    };

                    const token = jwt.sign(payload, config.authJwtSecret, { expiresIn: '15m' });

                    res.status(200).json({token, user: {id, name, email}});
                });
            } catch (error) {
                next(error);
            }
        })(req, res, next);
    });

    router.post('/sign-up', validationHandler(createUserSchema), async function (
        req,
        res,
        next
      ) {
        const { body: user } = req;
        const { email } = user;
        try {
          const userExists = await userService.getUser({ email });
          if (!userExists) {
            const createdUserId = await userService.createUser({ user });
    
            if(createdUserId > 0) {
                res.status(201).json({
                    data: createdUserId,
                    message: 'user created',
                });
            } else {
                res.status(202).json({
                    message: 'error while creating user',
                });
            }
          }else{
            res.status(202).json({
                message: 'user already exists',
              });
          }
        } catch (error) {
          next(error);
        }
      });

}

module.exports = authApi;