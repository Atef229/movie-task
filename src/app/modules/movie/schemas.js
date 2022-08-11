import { INVALID, REQUIRED } from '../../configs/constants';

export default {
    /**
     * @openapi
     * components:
     *   schemas:
     *     CreateMovie:
     *      type: object
     *      required:
     *      - categoryId
     *      - title
     *      - description
     *      - rate
     *      properties:
     *        categoryId:
     *          type: string
     *        title:
     *          type: string
     *        description:
     *          type: string
     *        rate:
     *          type: string
     *        image:
     *          type: string
     */
    create: {
        validation: {
            categoryId: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Category ID')
                },
                isValidObjectId: {
                    errorMessage: INVALID('Category ID')
                }
            },
            title: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('title')
                },
            },
            description: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('description')
                },
            },
            rate: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('rate')
                },
            },
            image: {
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
            filterByCategoryTitle: {
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
     *     UpdateMovie:
     *      type: object
     *      properties:
     *        categoryId:
     *          type: string
     *        title:
     *          type: string
     *        description:
     *          type: string
     *        rate:
     *          type: string
     *        image:
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
            categoryId: {
                in: 'body',
                optional: true,
                isValidObjectId: {
                    errorMessage: INVALID('Category ID')
                }
            },
            title: {
                in: 'body',
                optional: true
            },
            description: {
                in: 'body',
                optional: true
            },
            rate: {
                in: 'body',
                optional: true,
            },
            image: {
                in: 'body',
                optional: true
            },
        },
        authentication: true,
        checkAuthorities: false,
        permissions: []
    },
    //delete movie validation
    delete: {
        validation: {
            id: {
                in: 'params',
                notEmpty: {
                    errorMessage: REQUIRED('Movie ID')
                },
                isValidObjectId: {
                    errorMessage: INVALID('Movie ID')
                }
            }
        },
        authentication: true,
        checkAuthorities: false,
        permissions: []
    },
};