import { INVALID, REQUIRED } from '../../configs/constants';

export default {
    /**
     * @openapi
     * components:
     *   schemas:
     *     SignupEmailDto:
     *      type: object
     *      required: 
     *      - email
     *      - password
     *      - name
     *      - birthDate
     *      properties:
     *        email:
     *          type: string
     *        password:
     *          type: string
     *        name:
     *          type: string
     *        birthDate:
     *          type: string
     */
    signupByEmail: {
        validation: {
            email: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('email')
                },
                isEmail: {
                    errorMessage: INVALID('email')
                }
            },                
            password: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('password')
                },
            },
            name: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('name')
                },
            },
            birthDate: {
                in: 'body',
                optional: true
            },
        },
        authentication: false,
        checkAuthorities: false,
        permissions: []
    },
    /**
     * @openapi
     * components:
     *   schemas:
     *     LoginDto:
     *      type: object
     *      required: 
     *      - email
     *      - password
     *      properties:
     *        email:
     *          type: string
     *        password:
     *          type: string
     */
    login: {
        validation: {
            email: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('email')
                },
            },
            password: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('password')
                },
            }
        },
        authentication: false,
        checkAuthorities: false,
        permissions: []
    },
};
