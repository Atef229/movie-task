import { INVALID, REQUIRED } from '../../configs/constants';

export default {
    /**
     * @openapi
     * components:
     *   schemas:
     *     CreateCategory:
     *      type: object
     *      required:
     *      - title
     *      properties:
     *        title:
     *          type: string
     */
    create: {
        validation: {
            title: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('title')
                },
            },
        },
        authentication: true,
        checkAuthorities: false,
        permissions: []
    },
    /**
     * @openapi
     * components:
     *   schemas:
     *     SearchOptions:
     *      type: object
     *      required:
     *      - size
     *      - offset
     *      properties:
     *        size:
     *          type: number
     *        offset:
     *          type: number
     *        sort:
     *          type: string
     *        dir:
     *          type: string
     *          enum:
     *          - asc
     *          - desc
     *        searchTerm:
     *          type: string
     *        filterBy:
     *          type: array
     *          items:
     *            type: object
     */
    searchMovies: {
        validation: {
            size: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('size')
                },
            },         
            offset: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('offset')
                },
            },
            sort: {
                in: 'body',
                optional: true
            },
            dir: {
                in: 'body',
                optional: true,
                isIn: {
                    options: ['asc', 'desc'],
                    errorMessage: INVALID('dir')
                }
            },
            searchTerm: {
                in: 'body',
                optional: true
            },
            filterBy: {
                in: 'body',
                optional: true
            },
        },
        authentication: true,
        checkAuthorities: false,
        permissions: []
    },
    /**
     * @openapi
     * components:
     *   schemas:
     *     UpdateCategory:
     *      type: object
     *      properties:
     *        title:
     *          type: string
     */
    update: {
        validation: {
            id: {
                in: 'params',
                notEmpty: {
                    errorMessage: REQUIRED('Category ID')
                },
                isValidObjectId: {
                    errorMessage: INVALID('Category ID')
                }
            },      
            title: {
                in: 'body',
                optional: true
            },
        },
        authentication: true,
        checkAuthorities: false,
        permissions: []
    },
    //delete category validation
    delete: {
        validation: {
            id: {
                in: 'params',
                notEmpty: {
                    errorMessage: REQUIRED('Category ID')
                },
                isValidObjectId: {
                    errorMessage: INVALID('Category ID')
                }
            }
        },
        authentication: true,
        checkAuthorities: false,
        permissions: []
    },
};