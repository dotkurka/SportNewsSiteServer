import mongoose from 'mongoose';

export enum Roles {
    User = 'USER',
    Admin = 'ADMIN',
}

const Role = new mongoose.Schema({
    value: { type: String, unique: true, default: Roles.User },
});

export default mongoose.model('role', Role);
