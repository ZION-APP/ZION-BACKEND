const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UsersService = require('../../../services/users');

passport.use(
    new BasicStrategy(async function( email, password, done) {
        const userService = new UsersService();
        try{
            const user = await userService.getUser({ email });
            if(!user) {
                return done(boom.unauthorized(), false);
            }
            if(!(await bcrypt.compare(password, user.password))) {
                return done(boom.unauthorized(), false);
            }
            delete user.password;  // Eliminamos para que no sea visible en adelante

            return done(null, user);
        }catch (error) {
            return done(error);
        }
    })
);