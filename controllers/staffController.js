const userService = require('../services/userService');
const bcrypt = require('bcrypt');

const createStaff = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userService.createUser({
      username,
      email,
      password: hashedPassword,
      role: role || 'staff'
    });

    res.status(201).json({ message: 'Staff user created', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

const getAllStaff = async (req, res) => {
  try {
    const staffUsers = await userService.getAllUsers({ role: 'staff' });
    res.status(200).json(staffUsers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

const updateStaff = async (req, res) => {
  try {
    const updatedStaff = await userService.updateUser(req.params.id, req.body);
    if (!updatedStaff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.status(200).json({ message: 'Staff updated', staff: updatedStaff });
  } catch (err) {
    res.status(500).json({ message: 'Error updating staff', error: err.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.status(200).json({ message: 'Staff deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting staff', error: err.message });
  }
};

const updatePermissions = async (req, res) => {
  try {
    const { create, read, update, delete: del } = req.body;

    const updatedUser = await userService.updateUser(req.params.id, {
      permissions: {
        create: !!create,
        read: !!read,
        update: !!update,
        delete: !!del,
      },
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.status(200).json({ message: 'Permissions updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error updating permissions', error: err.message });
  }
};

module.exports = {
  createStaff,
  getAllStaff,
  updateStaff,
  deleteStaff,
  updatePermissions,
};