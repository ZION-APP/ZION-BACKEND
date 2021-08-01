const express = require('express');
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
const { createUserSchema } = require('../utils/schemas/user');


function authApi(app) {
    const router = express.Router();
    app.use('/api/auth', router);

    router.post('/sign-in', async function(req, res, next) {
        const {apiKeyToken} = req.body;

        if(!apiKeyToken) {
            next(boom.unauthorized('apiKeyToken is required'));
        }

        passport.authenticate('basic', { session: false }, function(error, user) {
            try{
                if(error || !user){
                    next(boom.unauthorized());
                    return;
                }
                req.logIn(user, {session: false}, async function(error) {
                    if(error) {
                        next(error);
                        return;
                    }
                    const apiKeyService = new ApiKeyService();
                    const scopes = await apiKeyService.getScopes({token: apiKeyToken});
                    
                    if(!scopes) {
                        next(boom.unauthorized());
                    }

                    const {id, username, email} = user;
                    const payload = {
                        sud: id,
                        username,
                        email,
                        scopes
                    };
                    const options = { 
                        expiresIn: '3600s', 
                    };

                    const token = jwt.sign(payload, config.authJwtSecret, options);

                    res.status(200).json({token, user: {id, username, email}});
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
          const userService = new UsersService();
          const userExists = await userService.getUserByUsernameOrEmail({ email });
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