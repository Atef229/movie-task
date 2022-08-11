import middlewares from '../../middlewares';
import schemas from './schemas';
import { UserController } from './user.controller';

export default (router) => {
    router.post('/search', ...middlewares(schemas, 'search'), UserController.search);

};
