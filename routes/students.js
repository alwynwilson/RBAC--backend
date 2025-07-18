const express = require('express');
const router = express.Router();

const {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

const verifyToken = require('../middleware/auth');
const { checkPermission } = require('../middleware/role');

router.post('/', verifyToken, checkPermission('create'), createStudent);
router.get('/', verifyToken, checkPermission('read'), getStudents);
router.put('/:id', verifyToken, checkPermission('update'), updateStudent);
router.delete('/:id', verifyToken, checkPermission('delete'), deleteStudent);

module.exports = router;