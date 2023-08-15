import mongoose from 'mongoose';

const navigationData = new mongoose.Schema();

navigationData.add({
    title: { type: String, require: true },
    path: { type: String, require: true },
    subItem: [navigationData],
});

export default mongoose.model('navigation', navigationData);
