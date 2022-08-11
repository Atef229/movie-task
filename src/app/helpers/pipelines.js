export default class Pipelines {
    //lookup movie
    static lookupMovieData() {
        return [
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: { path: '$category', preserveNullAndEmptyArrays: true }
            }
        ];
    }

}