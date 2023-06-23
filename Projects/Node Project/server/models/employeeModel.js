const mongoose = require('mongoose');
const Shift = require('./shiftModel');
const Department = require('./departmentModel');

const employeeSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    startWorkYear: Number,
    departmentId: {type: mongoose.Schema.Types.ObjectId, ref: 'department'},
    shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'shift'}]
  },
  { versionKey: false }
);

const Employee= mongoose.model('employee', employeeSchema, 'Employee');

module.exports = Employee;
