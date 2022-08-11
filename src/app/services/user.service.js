const User = mongoose.model('User');
import mongoose from 'mongoose';
import Utils from '../helpers/utils';

export class UserService {
    static async create(user) {
        return await User.create(user);
    }

    static async findById(_id) {
        return await User.findById(_id);
    }

    static async findOne(filter) {
        return await User.findOne(filter);
    }

    static async findByEmail(email) {
        return await User.findOne({ email });
    }

    /**
     * Search users collection
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
            { $project: { password: 0} },
            { $group: { _id: null, content: { $push: '$$ROOT' }, count: { $sum: 1 } } },
            { $project: { content: { $slice: ['$content', offset, size] }, count: 1, _id: 0 } },
        );

        const users = await User.aggregate(aggregation);

        if (users.length) {
            return {
                count: users[0].count,
                content: users[0].content,
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
        aggregation.push(
            {
                $match: {
                    $or: [
                        { email: { $regex: new RegExp(searchTerm), $options: 'i' } },
                    ],
                },
            },
        );
    }
    

}
