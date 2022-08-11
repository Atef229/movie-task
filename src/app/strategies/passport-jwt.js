import mongoose from 'mongoose';
const User = mongoose.model('User');
import { NOT_EXISTS , USER_AUTH } from '../configs/constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthError } from '../errors';


/**
 * Define passport-jwt strategy for authentication called "user-rule", extract user ID from token and ensure the user with ID exists in
 * database, then passport includes the found user in "req", so "req.user" will be accessible in controller after passing middlewares.
 * @example
 * request which requires authorization on protected resource should provide the following type of header:
 * Authorization: Bearer {JWT token}
 * @param secret
 * @param passport
 */
export default (secret, passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await User.query().findById(id).first();
        user ? done(null, user) : done(new AuthError(NOT_EXISTS), null);
    });

    let jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    };

    let strategy = new Strategy (jwtOptions, async (payload, next) => {
        let user = await User.findById(payload.id);

        if (user) {
            next(null, user);
        } else {
            next(new AuthError(NOT_EXISTS), false);
        }
    });

    passport.use(USER_AUTH, strategy);
};
