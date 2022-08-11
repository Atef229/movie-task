import { isEmpty, isNull, isUndefined, omitBy } from 'lodash';
export { Request, Response, NextFunction } from 'express';

/**
 * Intercept all requests to the api and filter the body from any undefined or null or empty values.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export function RequestInterceptorMiddleware(req, res, next) {
    if (!isEmpty(req.body)) {
        req.body = omitBy(req.body, (v) => isUndefined(v) || isNull(v) || v === '');
    }

    next();
}