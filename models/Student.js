const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    grade: String,
    contact: String,
});

const students = mongoose.model("students", studentSchema);

module.exports = students;