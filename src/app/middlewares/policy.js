import { AuthError, Forbidden } from '../errors';
import Permissions from '../helpers/Permissions';

export default (permissions = null) => {

    return async (req, res, next) => {
        if (!req.user) {
            return next(new AuthError('UnAuthorized'));
        }

        const userTypes = req.user.userType;
        if (Permissions.isSuperAdmin([userTypes])) {
            return next();
        }

        // if (!schema.permissions || !Array.isArray(schema.permissions) || schema.permissions.length === 0 ||
        //     !Array.isArray(userTypes) || userTypes.length === 0) {
        // if (!permissions || !Array.isArray(permissions) || permissions.length === 0 ||
        //     !Array.isArray(userTypes) || userTypes.length === 0) {                
        //     return next(new Forbidden());
        // }

        // if (!Permissions.hasPermissions(schema.permissions, userTypes)) {
        if (!Permissions.hasPermissions(permissions, [userTypes])) {
            return next(new Forbidden());
        }

        next();
    };
};
