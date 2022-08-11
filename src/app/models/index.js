import User from './user';
import Category from './category';
import Movie from './movie';

export default function initModels(mongoose) {
    User(mongoose);
    Category(mongoose);
    Movie(mongoose);
}
