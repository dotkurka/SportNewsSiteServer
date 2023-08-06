import mongoose from 'mongoose';

const User = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    roles: [{ type: String, ref: 'Role' }],
});

export default mongoose.model('user', User);
