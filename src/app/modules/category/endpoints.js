import middlewares from '../../middlewares';
import schemas from './schemas';
import { CategoryController } from './category.controller';

export default (router) => {
    router.post('/', ...middlewares(schemas, 'create') , CategoryController.create);
    router.post('/search', ...middlewares(schemas, 'searchCategories'), CategoryController.search);

    router.patch('/:id', ...middlewares(schemas, 'update'), CategoryController.categoriesUpdateOne);

    router.delete('/:id',  ...middlewares(schemas, 'delete'), CategoryController.deleteCategory);

};
