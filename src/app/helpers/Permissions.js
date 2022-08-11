import { USER_TYPES } from '../configs/constants';

export default class Permissions {
    /**
     * Validate if `userType` field has permission 0 (means superAdmin)
     * @param userPermissions
     * @returns {boolean}
     */
    static isSuperAdmin(userPermissions) {
        return userPermissions.indexOf(USER_TYPES.SuperAdmin.toString()) !== -1;
    }

    /**
     * Validate if `requiredPermissions` and `userPermissions` has at least one match
     * @example
     * delete: {
     *   authentication: true,
     *   checkAuthorities: true,
     *   permissions: [0, 1 , 2]
     * }
     * userType=[2, 3] // 0: SuperAdmin 1: Admin, 2: User, 3: Artisan, 4: Customer, 5: Supplier, 6: Affiliate...
     * based on the example above requiredPermissions=[0, 1 , 2] and user's permissions are [2, 3], which means that it will return true,
     * because user has permission 2 which includes in required permissions, so user can access to the requested endpoint
     * @param requiredPermissions
     * @param userPermissions
     * @returns {boolean}
     */
    static hasPermissions(requiredPermissions, userPermissions) {
        const intersection = requiredPermissions.filter(permission => userPermissions.includes(permission.toString()));

        return !!intersection.length;
    }

}
