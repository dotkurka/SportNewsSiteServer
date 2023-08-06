import mongoose from 'mongoose';

const Role = new mongoose.Schema({
    value: { type: String, unique: true, default: 'USER' },
});

export default mongoose.model('role', Role);
