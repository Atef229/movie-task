import { REQUIRED } from '../../configs/constants';

export default {
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
    search: {
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
                optional: true
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
};
