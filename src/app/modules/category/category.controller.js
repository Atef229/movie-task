import { NOT_EXISTS, ALREADY_EXISTS } from '../../configs/constants';
import { CREATED_CODE, NO_CONTENT_CODE, SUCCESS_CODE } from '../../configs/api-status-codes';
import { BadRequest, NotFound } from '../../errors';
import { CategoryService } from '../../services';


export class CategoryController {


    /**
     * @openapi
     * /api/categories/:
     *   post:
     *     summary: Create category
     *     tags: [categories]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/CreateCategory"
     */
    static async create(req, res, next) {
        
        let { title } = req.body;

        try {

            //check if category exist or not
            let checkCategory = await CategoryService.findByTitle(title);

            if (checkCategory) {
                throw new BadRequest(ALREADY_EXISTS('category'));
            }

            //category data
            let categoryData = {
                title
            };

            //send category data to DB
            let category = await CategoryService.create(categoryData);


            return res.status(CREATED_CODE).json(category);

        } catch (err) {
            next(err);
        }
    }
    /**
     * @openapi
     * /api/categories/search:
     *   post:
     *     summary: Search categories
     *     tags: [categories]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/SearchOptions"
     */
    static async search(req, res, next) {
        try {

            const categories = await CategoryService.findAll(req.body);

            return res.status(SUCCESS_CODE).json(categories);
        } catch (err) {
            next(err);
        }
    }

    /**
     * @openapi
     * /api/categories/{id}:
     *   patch:
     *     summary: Update categories
     *     tags: [categories]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: category id
     *     requestBody:
     *       required: false
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/Updatecategory"
     */
    static async categoriesUpdateOne(req, res, next) {
        const { id } = req.params;

        try {
            const category = await CategoryService.findById(id);
            //chick if category not exist
            if (!category) {
                throw new NotFound(NOT_EXISTS(`category with id: ${id}`));
            }


            let categoryUpdate = await CategoryService.updateById(id, req.body);
            

            return res.status(SUCCESS_CODE).json(categoryUpdate);
        } catch (err) {
            next(err);
        }
    }

    /**
     * @openapi
     * /api/categories/{id}:
     *   delete:
     *     summary: delete category
     *     tags: [categories]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: category id
     */
    static async deleteCategory(req, res, next) {
        const { id } = req.params;
        try {

            const category = await CategoryService.findById(id);
            //check if category not exicet
            if (!category) {
                throw new NotFound(NOT_EXISTS(`category with id: ${id}`));
            }

            await CategoryService.deleteCategory(category._id);

            return res.status(NO_CONTENT_CODE).json({});
        } catch (err) {
            next(err);
        }
    }
 
}