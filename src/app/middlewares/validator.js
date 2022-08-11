import { pickBy } from 'lodash';
import { ServiceUnavailable, ValidationError } from '../errors';

/**
 * Middleware responsible for request validation using json schema with validation rules using `express-validator` library
 * @param schema
 * @returns {Function} middleware
 */
export default (schema = null) => {

    return async (req, res, next) => {
        if (schema) {
            req.check(schema);

            // Strip validated object of any properties that is not included in the schema.
            req.body = pickBy(req.body, (value, key) => Object.keys(schema).includes(key));
        }

        let result;
        try {
            result = await req.getValidationResult();
        } catch (error) {
            return next(new ServiceUnavailable(error.message));
        }

        if (result && !result.isEmpty()) {
            return next(new ValidationError(result.mapped()));
        }

        next();
    };
};
