import mongoose from 'mongoose';

const ArticleModel = new mongoose.Schema(
    {
        img: { type: String },
        alt: { type: String },
        title: { type: String, require: true },
        description: { type: String },
        category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category' }],
        article: { type: String },
        path: { type: String },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    },
    {
        timestamps: { createdAt: 'published', updatedAt: false },
    }
);

export default mongoose.model('article', ArticleModel);
