import mongoose from 'mongoose';

const ArticleModel = new mongoose.Schema({
    img: { type: String },
    alt: { type: String },
    title: {
        published: { type: String },
        head: { type: String },
        description: { type: String },
    },
    category: { type: String, ref: 'category' },
    article: { type: String },
    path: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

export default mongoose.model('article', ArticleModel);
