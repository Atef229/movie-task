import middlewares from '../../middlewares';
import schemas from './schemas';
import { MovieController } from './movie.controller';

export default (router) => {
    router.post('/', ...middlewares(schemas, 'create') , MovieController.create);
    router.post('/search', ...middlewares(schemas, 'searchMovies'), MovieController.search);

    router.patch('/:id', ...middlewares(schemas, 'update'), MovieController.moviesUpdateOne);

    router.delete('/:id',  ...middlewares(schemas, 'delete'), MovieController.deleteMovie);

};
