const passport = require('passport');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

/**
 * Middleware responsible for authenticating with `passport` library
 * rule is custom name of your authentication strategy allowing possibility to set another rules of auth within same app
 * @example
 * we can define other rule called "admin-rule" and implement basic authentication with session support
 * @param rule
 * @returns {Function} middleware
 */
export default (rule) => {
    return passport.authenticate(rule, { session: false });
};
