import User from '../models/user.js';

const getAllUsers = async () => {
    const users = await User.find();

    return users;
};

export default getAllUsers;
