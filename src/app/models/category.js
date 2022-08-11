export default (mongoose) => {
    let CategorySchema = mongoose.Schema(
        {
            title: { type:String, required: true, unique: true  },
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now },
        },
        {
            timestamps: true,
        },
    );

    return mongoose.model('Category', CategorySchema);
};