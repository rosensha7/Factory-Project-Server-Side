const mongoose = require('mongoose');
const Employee = require('./employeeModel');

const shiftSchema = new mongoose.Schema(
  {
    startingHour: Number,
    endingHour: Number,
    date: Date,
    employees: [
      {type: mongoose.Schema.Types.ObjectId, ref: 'employee'}
    ]
  },
  { versionKey: false }
);

const Shift = mongoose.model('shift', shiftSchema, 'Shift');

module.exports = Shift;
