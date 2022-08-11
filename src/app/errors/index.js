/**
 * Error is the main class on Javascript which is responsible for any kind of errors thrown in the app working cycle
 * This file contains extended classes from Error which also provide api status code (eg. 400, 401, etc) and
 * giving big advantage to send the right api error status response to the client, also make the much more readable
 * the file is mostly used in controllers
 * @example
 * const user = await UserService.findById(id);
 * if (!user ) {
 *     throw new NotFound(NOT_EXISTS('User'));
 * }
 */

import {
    UNAUTHORIZED_CODE,
    BAD_REQUEST_CODE,
    GONE_CODE,
    FORBIDDEN_CODE,
    SERVICE_UNAVAILABLE_CODE,
    VALIDATION_ERROR_CODE,
    CONFLICT_CODE,
    INTERNAL_SERVER_ERROR,
    BAD_GATEWAY,
    NOT_FOUND_CODE
} from '../configs/api-status-codes';

import {
    PERMISSION_DENIED,
    SOMETHING_WENT_WRONG,
    VALIDATION_ERROR,
    SERVICE_UNAVAILABLE,
} from '../configs/constants';

export class AuthError extends Error {
    status = UNAUTHORIZED_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class BadRequest extends Error {
    status = BAD_REQUEST_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class Conflict extends Error {
    status = CONFLICT_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class NotFound extends Error {
    status = NOT_FOUND_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class Forbidden extends Error {
    status = FORBIDDEN_CODE;
    message = PERMISSION_DENIED;
    errors;

    constructor(errors = null) {
        super();
        this.errors = errors;
    }
}

export class Gone extends Error {
    status = GONE_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class ValidationError extends Error {
    status = VALIDATION_ERROR_CODE;
    message = VALIDATION_ERROR;
    errors;

    constructor(errors) {
        super();
        this.errors = errors;
    }
}

export class ExternalApiError extends Error {
    status = SERVICE_UNAVAILABLE_CODE;
    message = SERVICE_UNAVAILABLE;
    errors;

    constructor(errors) {
        super();
        this.errors = errors;
    }
}

export class InternalServerError extends Error {
    status = INTERNAL_SERVER_ERROR;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class BadGateway extends Error {
    status = BAD_GATEWAY;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class ServiceUnavailable extends Error {
    status = BAD_REQUEST_CODE;
    message = SOMETHING_WENT_WRONG;
    errors;

    constructor(message, errors = null) {
        super();

        if (errors) {
            this.message = message;
            this.errors = errors;
        } else {
            if (typeof message === 'string') {
                this.message = message;
            } else {
                this.errors = message;
            }
        }
    }
}
