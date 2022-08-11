const Category = mongoose.model('Category');
import mongoose from 'mongoose';
import Utils from '../helpers/utils';

export class CategoryService {

    static async create(category) {
        return await Category.create(category);
    }

    static async findById(_id) {
        return await Category.findById(_id);
    }

    static async findByTitle(title) {
        return await Category.findOne({title});
    }

    static async updateById(_id, attributes) {
        const options = { new: true };

        return Category.findOneAndUpdate({ _id }, attributes, options);
    }

    /**
     * Find one appointment by id and populate [userId, providerId, services]
     * @param {String} id 
     */
    static async findOnePopulated(id) {
        const aggregation = [
            {
                $match: { _id: mongoose.Types.ObjectId(id) }
            },
        ];

        const result = await Category.aggregate(aggregation);

        return result[0];
    }
    
    /**
     * Search comment collection
     * @param {*} options 
     */
    static async findAll(options) {
        let aggregation = [];
        
        const { size, offset, sort, dir, searchTerm, filterBy } = options;

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
            { $group: { _id: null, content: { $push: '$$ROOT' }, count: { $sum: 1 } } },
            { $project: { content: { $slice: ['$content', offset, size] }, count: 1, _id: 0} },
        );

        const categories = await Category.aggregate(aggregation);

        if (categories.length) {
            return {
                count: categories[0].count,
                content: categories[0].content,
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

    static async deleteCategory(_id) {
        return await Category.findByIdAndRemove(_id);
    }
  
}