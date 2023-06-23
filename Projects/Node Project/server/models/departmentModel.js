const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    name: String,
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'employee'},
    employees: [{type: mongoose.Schema.Types.ObjectId, ref: 'employee'}]
  },
  { versionKey: false }
);

const Department = mongoose.model('department', departmentSchema, 'Departments');

module.exports = Department;
