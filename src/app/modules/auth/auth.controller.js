import Utils from '../../helpers/utils';
import {
    ALREADY_EXISTS,
    INVALID_CREDENTIALS
} from '../../configs/constants';
import { CREATED_CODE, SUCCESS_CODE } from '../../configs/api-status-codes';
import { BadRequest } from '../../errors';
import { UserService } from '../../services';

export class AuthController {

    /**
     * @openapi
     * /api/auth/signup:
     *   post:
     *     summary: Signup a new user by email
     *     tags: [auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/SignupEmailDto"
     */
    static async signupByEmail(req, res, next) {
        try {
            const { email } = req.body;
            
            // Find if user exists
            let user = await UserService.findOne({ email });

            if (user) {
                throw new BadRequest(ALREADY_EXISTS('User'));
            } else {
                // Create a new user
                user = await UserService.create(req.body);
            }

            // Remove password from result
            user = user.toJSON();
            delete user.password;
            

            return res.status(CREATED_CODE).json({ user });
        } catch (err) {
            next(err);
        }
    }

    /**
     * @openapi
     * /api/auth/login:
     *   post:
     *     summary: Login
     *     tags: [auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/LoginDto"
     */
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            
            // Find user with email
            let user = await UserService.findOne({
                $or: [{ email: email.toLowerCase() }]
            });

            // If no user or password mismatch
            if (!user || !user.comparePassword(password)) {
                throw new BadRequest(INVALID_CREDENTIALS);
            }

            // Remove password and code from response
            user = user.toJSON();
            delete user.password;

            // Generate access token
            const { token } = Utils.signJWTToken(user);

            return res.status(SUCCESS_CODE).json({ token, user });
        } catch (err) {
            next(err);
        }
    }

}
