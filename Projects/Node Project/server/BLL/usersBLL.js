const { InvalidDataError } = require('../errors/invalidDataError');
const User = require('../models/userModel');

const getAllUsers = async () => {
    const users = await User.find();
    return users;
};

const getUserById = async (id) => {
    const userById = await User.find({ id: id });
    return userById;
};

const addUser = async (obj) => {
    if (isValidUser(obj)) {
        const user = new User(obj);
        await user.save();
        return 'Added';
    } else {
        throw new InvalidDataError();
    }
};

const updateUser = async (id, obj) => {
    if (isValidUser(obj)) {
        await User.findByIdAndUpdate({ _id: id }, obj);
        return 'Updated';
    } else {
        throw new InvalidDataError();
    }
};

const deleteUser = async (id) => {
    await User.findByIdAndDelete(id);
    return 'Deleted';
};

const isValidUser = (user) => {
    return user.name && user.maxConnections >= 0;
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};