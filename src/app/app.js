import express from 'express';
import RateLimit from 'express-rate-limit';
import logger from 'morgan';
import helmet from 'helmet';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import expressValidator from 'express-validator';
import passport from 'passport';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import enableModules from './modules';
import limiter from './configs/limiter';
import corsOptions from './configs/cors';
import { INTERNAL_SERVER_ERROR } from './configs/api-status-codes';
import { ServiceUnavailable } from './errors';
import configPassport from './strategies/passport-jwt';
import { isValidArray, isValidObjectId } from './validators';
import params from './configs/params';
import { RequestInterceptorMiddleware } from './middlewares/request-interceptor';
import { join } from 'path';

class Application {
    app;
    router;

    constructor() {
        this.app = express();
        this.initApp();
    }

    initApp() {
        this.configApp();
        this.configPassport();
        this.setParams();
        this.initSwagger();
        this.setRouter();
        this.enableModules();
        this.setErrorHandler();
    }

    initSwagger() {
        const options = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'task API',
                    version: '1.0.0',
                    description: '## 1. Getting started\n### 1.1',
                },
                servers: [
                    { 'url': params.apiUrl }
                ],
            },
            apis: [__dirname + '/modules/*/*.js', __dirname + '/models/*.js']
        };
        
        const specs = swaggerJSDoc(options);

        this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));
    }

    /**
     * Initialize and configure the core middlewares responsible for different purposes for making api run safe and reliable
     */
    configApp() {
        if (this.app.get('env') !== 'production') {
            this.app.use(logger('dev'));
        }

        this.app
                .use(this.configCors())
                .use(this.configValidator())
                .use(this.configRateLimiter())
                .use(json({
                    // We need the raw body to verify webhook signatures.
                    // Let's compute it only when hitting the Stripe webhook endpoint.
                    verify: function (req, res, buf) {
                        if (req.originalUrl.startsWith('/api/payments/webhook')) {
                            req.rawBody = buf.toString();
                        }
                    },
                })) // {@link https://www.npmjs.com/package/body-parser#bodyparserjsonoptions}
                .use(urlencoded({ extended: true })) // {@link https://www.npmjs.com/package/body-parser#bodyparserurlencodedoptions}
                .use(cookieParser()) // {@link https://www.npmjs.com/package/cookie-parser}
                .use(helmet()) // {@link https://helmetjs.github.io}
                .use(express.static(join(__dirname, '..', '..', 'public')));
    }

    /**
     * Initialize rate limiter middleware which will prevent too many requests to the APi within short time
     * mostly can be helpful from DDoS attacks
     * @example windowsMs=15 * 60 * 1000, max=2500 means that during 15 minutes only 2500 requests are allowed, otherwise client
     * will get error with status 429 (too many requests)
     * {@link https://www.npmjs.com/package/express-rate-limit}
     * @returns {RateLimit}
     */
    configRateLimiter() {
        return new RateLimit(limiter);
    }

    /**
     * Initialize express-validator (Wrapping up validator.js and sanitizer functions) middleware along with custom validators
     * Middleware is responsible tfor validating incoming POST/PUT/GET/PATCH requests, used schema validation features
     * {@link https://express-validator.github.io/docs}
     * {@link https://express-validator.github.io/docs/schema-validation.html Schema Validation}
     * {@link https://express-validator.github.io/docs/custom-validators-sanitizers.html Custom Validators}
     * @returns {express.RequestHandler | *}
     */
    configValidator() {
        return expressValidator({
            customValidators: {
                isValidArray: isValidArray,
                isValidObjectId: isValidObjectId,
            }
        });
    }

    /**
     * Initialize "CORS" middleware responsible for whitelisting special domains which can use the API
     * Define cross origin policy, `origin` option can contain one or multiple domain names which are whitelisted for API,
     * others domains will be restricted to access on API resources
     * Uses `cors` library
     * {@link https://www.npmjs.com/package/cors}
     * @returns {Function} middleware
     */
    configCors() {
        return cors(corsOptions);
    }

    /**
     * Initialize "Passport" middleware responsible for user authentication and authorization
     * Used passport-jwt strategy along with "Bearer" support, in order to create, verify, decode access tokens
     * {@link http://www.passportjs.org}
     * {@link https://www.npmjs.com/package/passport-jwt}
     */
    configPassport() {
        configPassport(params.jwtSecret, passport);
        this.app.use(passport.initialize())
                .use(passport.session());
    }

    setParams() {
        this.app.set('json spaces', 4);
    }

    /**
     * Setup the Express router, also set the main prefix of the api endpoints
     * @example http://apidomain.com/api is the main route of all other endpoints
     */
    setRouter() {
        // Added for intercepting requests
        this.app.use(RequestInterceptorMiddleware);

        this.router = express.Router();
        this.app.use(`/api`, this.router);

        // Added for tracing errors
        this.app.use(function (req, res, next) {
            let err = new Error('Route Not Found');
            err.status = 404;
            next(err);
        });
    }

    /**
     * Global error handler middleware which executes when any of middlewares pushes the error object in `next`, as well as from controllers
     * All controller methods support try/catch blocks and any kind of error goes through next, eg. `next(err)` which goes to
     * this method and the final structured response will be sent to client
     */
    setErrorHandler() {
        this.app.use(async (err, req, res, next) => {
            if (!err.status) {
                next(new ServiceUnavailable(err.message));
            }

            let status = err.status || INTERNAL_SERVER_ERROR;

            return res.status(status).json({
                url: req.originalUrl,
                status: status,
                message: err.message || 'INTERNAL ERROR',
                errors: err.errors,
                body: req.body,
                params: req.params
            });
        });
    }

    /**
     * Initialize all available modules along with own routing and endpoints
     */
    enableModules() {
        enableModules(this.router);
    }

}

export default () => new Application().app;
