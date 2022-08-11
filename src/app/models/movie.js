export default (mongoose) => {
    let MovieSchema = mongoose.Schema(
        {
            categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
            title: { type: String, required: true },
            description: { type: String, required: true },
            rate: { type: String, required: true },
            image: { type: String, required: false },

            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now },
        },
        {
            timestamps: true,
        },
    );

    return mongoose.model('Movie', MovieSchema);
};