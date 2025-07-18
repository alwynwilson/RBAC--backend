const Student = require('../models/Student');

const createStudent = async (data) => {
    const student = new Student(data);
    return await student.save();
};

const getAllStudents = async () => {
    return await Student.find();
};

const updateStudent = async (id, data) => {
  return await Student.findByIdAndUpdate(id, data, { new: true });
};

const deleteStudent = async (id) => {
  return await Student.findByIdAndDelete(id);
};

module.exports = {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent
};