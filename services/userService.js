const User = require("../models/User");

const createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

const getAllUsers = async (filter) => {
  return await User.find(filter);
};

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const updateUserPermissions = async (id, permissions) => {
  return await User.findByIdAndUpdate(
    id,
    { permissions },
    { new: true }
  );
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  findUserByEmail,
  updateUserPermissions,
};