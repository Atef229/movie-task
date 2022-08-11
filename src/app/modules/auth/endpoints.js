import { AuthController } from './auth.controller';
import middlewares from '../../middlewares';
import schemas from './schemas';

export default (router) => {
    router.post('/signup', ...middlewares(schemas, 'signupByEmail'), AuthController.signupByEmail);
    router.post('/login', ...middlewares(schemas, 'login'), AuthController.login);
};

