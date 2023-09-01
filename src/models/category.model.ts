import mongoose from 'mongoose';

const CategoryModel = new mongoose.Schema();

CategoryModel.add({
    title: { type: String, require: true },
    path: { type: String, require: true },
    subItem: [CategoryModel],
});

export default mongoose.model('category', CategoryModel);
