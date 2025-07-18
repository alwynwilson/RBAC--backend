const express = require('express');
const router = express.Router();
const {
  createStaff,
  getAllStaff,
  updateStaff,
  deleteStaff,
  updatePermissions,
} = require('../controllers/staffController');
const verifyToken = require('../middleware/auth');
const { isSuperAdmin } = require('../middleware/role');

router.use(verifyToken, isSuperAdmin);

router.post('/', createStaff);
router.get('/', getAllStaff);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);
router.put('/:id/permissions', updatePermissions);

module.exports = router;