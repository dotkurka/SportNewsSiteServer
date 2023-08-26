import { userRoles } from '../constants/index.js';
import mongoose from 'mongoose';

const Role = new mongoose.Schema({
    value: {
        type: String,
        unique: true,
        enum: [userRoles.admin, userRoles.user],
        default: userRoles.user,
    },
});

export default mongoose.model('role', Role);
