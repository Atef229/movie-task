import { ObjectID } from 'bson';

/**
 * Custom validator which checks if the request parameter is array or not, this is a custom validator created for express-validator and
 * can be used in modules schema.js files
 * @param value
 * @returns {arg is Array<any> | *}
 */
export const isValidArray = (value) => {
    return  (Array.isArray(value) && value.length);
};

export const isValidObjectId = (id) => {
    let result = true;

    if (id) {
        try {
            id = new ObjectID(id);
            if (!ObjectID.isValid(id)) {
                throw new Error(`Invalid id ${id}`);
            }
        } catch(e) {
            result = false;
        }
    }

    return result;
};
