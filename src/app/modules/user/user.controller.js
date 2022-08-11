/* eslint-disable no-console */
import { UserService } from '../../services';
import { SUCCESS_CODE } from '../../configs/api-status-codes';

export class UserController {

    /**
     * @openapi
     * /api/users/search:
     *   post:
     *     summary: Search users
     *     tags: [users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/SearchOptions"
     */
    static async search(req, res, next) {
        try {
            const users = await UserService.findAll(req.body);

            return res.status(SUCCESS_CODE).json(users);
        } catch (err) {
            next(err);
        }
    }

    static async createDefaultSA(saUserData) {
        try {
            // Create a new super admin if none was found in the database
            let exists = await UserService.findByEmail(saUserData.email);
            if (!exists) {
                await UserService.create(saUserData);
            }
        } catch (err) {
            console.log(err);
        }
    }

}

