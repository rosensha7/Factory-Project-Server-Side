const { InvalidDataError } = require('../errors/invalidDataError');
const Employee = require('../models/employeeModel');

const getAllEmployees = async () => {
  const employees = await Employee.find()
    .populate({
      path: 'departmentId',
      select: 'name manager'
    })
    .populate({
      path: 'shifts',
      select: 'date startingHour endingHour'
    });
  return employees;
};

const getEmployeeById = async (id) => {
  const empById = await Employee.findById({ _id: id })
    .populate({
      path: 'departmentId',
      select: 'name manager'
    })
    .populate({
      path: 'shifts',
      select: 'date startingHour endingHour'
    });
  return empById;
};

const addEmployee = async (obj) => {
  if (isValidEmployee(obj)) {
    const employee = new Employee(obj);
    await employee.save();
    return 'Added';
  } else {
    throw new InvalidDataError();
  }
};

const updateEmployee = async (id, obj) => {
  if (isValidEmployee(obj)) {
    await Employee.findByIdAndUpdate({ _id: id }, obj);
    return 'Updated';
  } else {
    throw new InvalidDataError();
  }
};

const deleteEmployee = async (id) => {
  await Employee.findByIdAndDelete(id);
  return 'Deleted';
};

const isValidEmployee = (employee) => {
  return employee.firstName && employee.lastName && employee.startWorkYear > 1900;
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee
};