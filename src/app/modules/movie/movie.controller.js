import { NOT_EXISTS, ALREADY_EXISTS } from '../../configs/constants';
import { CREATED_CODE, NO_CONTENT_CODE, SUCCESS_CODE } from '../../configs/api-status-codes';
import { BadRequest, NotFound } from '../../errors';
import { CategoryService, MovieService } from '../../services';


export class MovieController {


    /**
     * @openapi
     * /api/movies/:
     *   post:
     *     summary: Create movie
     *     tags: [movies]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/CreateMovie"
     */
    static async create(req, res, next) {
        
        let { categoryId, title, description, rate, image } = req.body;

        try {

            //check if category exist or not
            let checkCategory = await CategoryService.findById(categoryId);

            if (!checkCategory) {
                throw new BadRequest(NOT_EXISTS('category id'));
            }

            //movie data
            let movieData = {
                categoryId,
                title,
                description,
                rate,
                image
            };

            //send movie data to DB
            let movie = await MovieService.create(movieData);


            return res.status(CREATED_CODE).json(movie);

        } catch (err) {
            next(err);
        }
    }
    /**
     * @openapi
     * /api/movies/search:
     *   post:
     *     summary: Search movies
     *     tags: [movies]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/SearchOptions"
     */
    static async search(req, res, next) {
        try {

            const movies = await MovieService.findAll(req.body);

            return res.status(SUCCESS_CODE).json(movies);
        } catch (err) {
            next(err);
        }
    }

    /**
     * @openapi
     * /api/movies/{id}:
     *   patch:
     *     summary: Update movies
     *     tags: [movies]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: movie id
     *     requestBody:
     *       required: false
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/UpdateMovie"
     */
    static async moviesUpdateOne(req, res, next) {
        const { id } = req.params;

        try {
            const movie = await MovieService.findById(id);
            //chick if movie not exist
            if (!movie) {
                throw new NotFound(NOT_EXISTS(`movie with id: ${id}`));
            }

            if(req.body.categoryId){
                //check if category exist or not
                let checkCategory = await CategoryService.findById(req.body.categoryId);

                if (!checkCategory) {
                    throw new BadRequest(NOT_EXISTS('category id'));
                }
            }


            let movieUpdate = await MovieService.updateById(id, req.body);
            

            return res.status(SUCCESS_CODE).json(movieUpdate);
        } catch (err) {
            next(err);
        }
    }

    /**
     * @openapi
     * /api/movies/{id}:
     *   delete:
     *     summary: delete category
     *     tags: [movies]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: category id
     */
    static async deleteMovie(req, res, next) {
        const { id } = req.params;
        try {

            const movie = await MovieService.findById(id);
            //check if movie not exist
            if (!movie) {
                throw new NotFound(NOT_EXISTS(`movie with id: ${id}`));
            }

            await MovieService.deleteMovie(movie._id);

            return res.status(NO_CONTENT_CODE).json({});
        } catch (err) {
            next(err);
        }
    }
 
}