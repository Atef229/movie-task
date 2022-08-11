const Movie = mongoose.model('Movie');
import mongoose from 'mongoose';
import Utils from '../helpers/utils';
import Pipelines from '../helpers/pipelines';

export class MovieService {

    static async create(movie) {
        return await Movie.create(movie);
    }

    static async findById(_id) {
        return await Movie.findById(_id);
    }



    static async updateById(_id, attributes) {
        const options = { new: true };

        return Movie.findOneAndUpdate({ _id }, attributes, options);
    }
    
    /**
     * Search comment collection
     * @param {*} options 
     */
    static async findAll(options) {
        let aggregation = [];
        
        const { size, offset, sort, dir, searchTerm, filterBy, filterByCategoryTitle } = options;

        // Apply sort
        if (sort && dir) {
            Utils.sort(aggregation, sort, dir);
        }

        // Filter results
        if (options.filterBy && options.filterBy.length) {
            Utils.filter(aggregation, filterBy);
        }

        // Search and filter results with provided term
        if (searchTerm) {
            this.search(aggregation, searchTerm);
        }

        aggregation.push(
            ...Pipelines.lookupMovieData(),
        );

        if (filterByCategoryTitle) {

            aggregation.push(
                {
                    $match : {'category.title':{ $regex: new RegExp(filterByCategoryTitle) }}

                }
            );
        }

        aggregation.push(
            { $group: { _id: null, content: { $push: '$$ROOT' }, count: { $sum: 1 } } },
            { $project: { content: { $slice: ['$content', offset, size] }, count: 1, _id: 0} },
        );

        const movies = await Movie.aggregate(aggregation);

        if (movies.length) {
            return {
                count: movies[0].count,
                content: movies[0].content,
            };
        } else {
            return {
                count: 0,
                content: [],
            };
        }
    }

    /**
     * Search users fields.
     * @param {*} aggregation 
     * @param {*} searchTerm 
     */
    static search(aggregation, searchTerm){
        aggregation.push({
            $match: {
                $or: [
                    { title: { $regex: new RegExp(searchTerm), $options: 'i' } },
                ],
            },
        });
    }

    static async deleteMovie(_id) {
        return await Movie.findByIdAndRemove(_id);
    }
  
}