/**
 * Service layer is a separate package containing internal and external services
 * Internal: these are the services which interact with database models (mongoose schemas) and can be used in multiple modules
 * for example company module may need to get user's information, that for it can get from user service `findById`
 * External: these are the services which can do some job like sending email, facebook login, etc
 */
export { UserService } from './user.service';
export { CategoryService } from './category.service';
export { MovieService } from './movie.service';
