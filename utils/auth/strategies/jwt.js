const passport = require('passport');
const { Strategy , ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const UsersService = require('../../../services/users');
const { config } = require('../../../config');

passport.use(
    new Strategy(
        {
            secretOrKey: config.authJwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() // Va a extraer el token del header
        },
        async function(tokenPayload, done) {
            const userService = new UsersService();
            try{
                const user = await userService.getUserByUsernameOrEmail({ email: tokenPayload.email });
                if (!user) {
                    return done(boom.unauthorized(), false);
                }
                delete user.passport; // Borramos la password por seguridad

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);