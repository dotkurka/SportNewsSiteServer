import mongoose from 'mongoose';

const articleModel = new mongoose.Schema();

articleModel.add({
    title: { type: String, require: true },
    path: { type: String, require: true },
    subItem: [articleModel],
});

export default mongoose.model('article', articleModel);
