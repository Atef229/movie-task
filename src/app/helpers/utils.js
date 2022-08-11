import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import moment from 'moment';
import params from '../configs/params';
import { Types } from 'mongoose';
import { isEmpty } from 'lodash';


export default class Utils {
    /**
   * Generate access token using "jsonwebtoken" library
   * Sign JWT token which will contain user's id and token's created date as payload
   * @example in order to send request to the API endpoint which requires authentication, the request should contain the following header:
   * `Authorization: Bearer {TOKEN}`
   * Passport middleware will then use passport-jwt strategy and decode the token, get user's id, ensure that user exist on database and
   * allow to continue and go to next middleware
   * {@link https://www.npmjs.com/package/jsonwebtoken }
   * @param data
   * @param superAdmin
   * @returns {{token: *}}
   */
    static signJWTToken(data) {
        const payload = { id: data._id };
        let secret = params.jwtSecret;

        let token = jwt.sign(payload, secret, { expiresIn: params.jwtExpiry });

        return { token };
    }

    static createToken(expirationHours = 1, size = 35) {
        return {
            token: crypto.randomBytes(size).toString('hex'),
            expirationDate: moment().add(expirationHours, 'hours')
                    .valueOf(),
        };
    }

    static createCode() {
        return {
            token: this.generateRandomNumericString(),
            expirationDate: moment().add(1, 'hours').valueOf(),
        };
    }

    static escapeRegexSpecialCharacters(string) {
        return string.replace(/[<>*()?]/g, '\\$&');
    }

    static isNumber(n) {
        return typeof n === 'number';
    }

    static betweenRange(value, n1, n2) {
        return n1 <= value && n2 >= value;
    }

    static longitude(lon) {
        return !!(this.isNumber(lon) && this.betweenRange(lon, -180, 180));
    }

    static latitude(lat) {
        return !!(this.isNumber(lat) && this.betweenRange(lat, -90, 90));
    }

    static fnIsValidCoordinates(lon, lat) {
        return this.longitude(lon) && this.latitude(lat);
    }

    /**
     * Hash user password using bcrypt.
     * @param {String} value - password to hash
     * @param {Number} rounds - number of rounds. default is 10
     * @returns {String} - hashed password string
     */
    static toHash(value, rounds = 10) {
        return value ? bcrypt.hashSync(value, rounds) : value;
    }

    /**
     * Generate a random numeric string.
     * @param {Number} length - generated numeric string length
     * @returns {String} - a randomly generated numeric string
     */
    static generateRandomNumericString(length = 4) {
        if (isNaN(length)) {
            throw new TypeError('Length must be a number');
        }

        if (length < 1) {
            throw new RangeError('Length must be at least 1');
        }

        // List of numbers to choose from
        const possible = '0123456789';

        let code = '';
        for (let i = 0; i < length; i++) {
            // Add a random number from the possible numbers string
            code += possible.charAt(Math.floor(Math.random() * possible.length));
        }
  
        return code;
    }

    /**
     * Generate mongoDB aggregation pipeline steps from filterBy array.
     * @param {*} filter 
     */
    static toPipelineStage(filter) {
        const [key, value] = Object.entries(filter)[0];
      
        if (typeof value === 'string' && Types.ObjectId.isValid(value)) {
            filter[key] = Types.ObjectId(value);
        }
      
        if (typeof value !== 'string' && value[0]) {
            let valueTransformed = value;
            if (Types.ObjectId.isValid(value[0])) {
                valueTransformed = value.map((e) => Types.ObjectId(e));
            }
            filter[key] = { $in: valueTransformed };
        }
      
        return filter;
    }

    /**
     * Sort search results with one or more fields.
     * @param {[]} aggregation - array containing the aggregation pipeline
     * @param {*} sort - sort by
     * @param {*} dir - sort direction
     */
    static sort(aggregation, sort, dir) {
        console.log(dir);
        if (dir === 'asc') {
            aggregation.push({ $sort: { [sort]: 1 } });
        } else if (dir === 'desc') {
            aggregation.push({ $sort: { [sort]: -1 } });
        }
    }

    /**
     * Filter search results.
     * @param {*} aggregation - array containing the aggregation pipeline
     * @param {*} filterBy - filter by array which contains objects of filter
     */
    static filter(aggregation, filterBy) {
        const matchQry = [];
        for (const filter of filterBy) {
            if (!isEmpty(filter)) matchQry.push(Utils.toPipelineStage(filter));
        }

        if (matchQry.length) aggregation.push({ $match: { $and: matchQry } });
    }

    static formatMessage(data) {
        const msg = {
            from:data.from,
            to:data.to,
            message:data.message,
            room:data.room,
            type:data.type,
        };
        return msg;
    }

    static dateToDay(date) {
        let weekday = new Array(7);
        weekday[0] = 'Sunday';
        weekday[1] = 'Monday';
        weekday[2] = 'Tuesday';
        weekday[3] = 'Wednesday';
        weekday[4] = 'Thursday';
        weekday[5] = 'Friday';
        weekday[6] = 'Saturday';
        let isoDate = new Date(date);
        let day = weekday[isoDate.getDay()];
        return day;
    }
    
}
