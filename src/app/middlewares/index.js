import validator from './validator';
import passport from './passport';
import policy from './policy';
import { USER_AUTH } from '../configs/constants';

/**
 * Middleware functions are functions that have access to the request and response objects, also has "next" middleware functions
 * "Next" is used to allow or disallow to move from one middleware to another.
 * @example when request comes to the specific endpoint, middlewares will start executing one by one. Each middleware does own
 * job (eg passport middleware checks authentication, validator checks if request validation passed or not, etc) and
 * if everything is ok then middleware executes "next" function like this: next(); and the cycle goes to the next middleware, if
 * there is an error then the middleware will execute next(error) where error is instance of Error class, this will stop the cycle and the
 * main error handler middleware will work and send the final error response to client (see setErrorHandler function in app.js)
 *
 * Define passport and validation middlewares for endpoints based on schema structure
 * @example
 * schemas = {
 *   me: {
 *        authentication: true,
 *        authenticationType: USER_AUTH
 *   },
 *   addCompany: {
 *        authentication: true,
 *        authenticationType: USER_AUTH,
 *        validation: {
 *           city: {
 *               in: 'body',
 *               notEmpty: {
 *                  errorMessage: REQUIRED('City')
 *              }
 *          }
 *      }
 *   }
 * }
 * actionName = "addCompany"
 * the result will contain an array of passport authentication and validation functions which will be destructured on
 * appropriate endpoint which has called this function
 * example: router.post('/', ...middlewares(schemas, 'addCompany'), CompanyController.create);
 * @param schemas
 * @param actionName
 * @returns {Array}
 */
export default (schemas, actionName) => {
    const middlewares = [];

    if (!schemas[actionName]) {
        return middlewares;
    }

    if (schemas[actionName].authentication) {
        middlewares.push(passport(USER_AUTH));
    }

    if (schemas[actionName].validation) {
        middlewares.push(validator(schemas[actionName].validation));
    }

    if (schemas[actionName].checkAuthorities) {
        middlewares.push(policy(schemas[actionName].permissions));
    }

    return middlewares;
};
